import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Autosuggest from "react-autosuggest";
import "./ComplaintForm.scss";
import { useTranslation } from "react-i18next";
import { ComplaintFormType } from "types/complaintType";
import { searchAddress } from "functions/searchAddress";
import usePostComplaint from "hooks/api/usePostComplaint";
import { CUSTOM_EVENT } from "enums/CustomEvent";
import toast from 'react-hot-toast';

const ComplaintForm = () => {
  const { t } = useTranslation();
  const { mutateAsync: postComplaint } = usePostComplaint();

  const [complaint, setComplaint] = useState<ComplaintFormType>({
    position: [0, 0],
    address: "",
    title: "",
    description: "",
  });
  const [postalCode, setPostalCode] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [isSuggestionSelected, setIsSuggestionSelected] = useState(false);

  const handleAddressChange = (_event: any, { newValue }: any) => {
    setComplaint((prevState) => ({ ...prevState, address: newValue }));
    if (timer) {
      clearTimeout(timer);
    }
    if (!isSuggestionSelected) {
      setTimer(
        setTimeout(async () => {
          if (newValue.length < 3) {
            return;
          }
          const data = await searchAddress(`${newValue} ${postalCode}`, 3);
          setSuggestions(data);
        }, 500),
      );
    } else {
      setIsSuggestionSelected(false);
    }
  };

  const getSuggestionValue = (suggestion: { display_name: any }) => {
    setIsSuggestionSelected(true);
    return suggestion.display_name;
  };

  const onSuggestionSelected = (_event: any, { suggestion }: any) => {
    setComplaint((prevState) => ({
      ...prevState,
      position: [parseFloat(suggestion.lat), parseFloat(suggestion.lon)],
    }));
  };

  const shouldEnableButton = (): boolean =>
    Boolean(complaint.position) &&
    complaint.position[0] !== 0 &&
    complaint.position[1] !== 0 &&
    Boolean(complaint.address) &&
    Boolean(complaint.title) &&
    Boolean(complaint.description);

  const handleCreateComplaint = async () => {
    await postComplaint(complaint);
    toast.success(t("complaint_created"));
    window.dispatchEvent(new Event(CUSTOM_EVENT.CLOSE_HEADER_MODAL));
  };

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  const inputProps = {
    placeholder: t("placeholder_address"),
    value: complaint.address,
    onChange: handleAddressChange,
  };

  return (
    <Form className="complaint-form">
      <Form.Group controlId="formTitle" className="form-group">
        <Form.Label>{t("form_title")}</Form.Label>
        <Form.Control
          type="text"
          placeholder={t("placeholder_title")}
          value={complaint.title}
          onChange={(e) =>
            setComplaint((prevState) => ({
              ...prevState,
              title: e.target.value,
            }))
          }
        />
      </Form.Group>

      <Form.Group controlId="formDescription" className="form-group">
        <Form.Label>{t("form_description")}</Form.Label>
        <Form.Control
          type="text"
          placeholder={t("placeholder_description")}
          value={complaint.description}
          onChange={(e) =>
            setComplaint((prevState) => ({
              ...prevState,
              description: e.target.value,
            }))
          }
        />
      </Form.Group>

      <Form.Group controlId="formPostalCode" className="form-group">
        <Form.Label>{t("form_postal_code")}</Form.Label>
        <Form.Control
          type="number"
          placeholder={t("placeholder_postal_code")}
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formAddress" className="form-group">
        <Form.Label>{t("form_address")}</Form.Label>
        <div className="autosuggest">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={() => {}}
            onSuggestionsClearRequested={() => setSuggestions([])}
            onSuggestionSelected={onSuggestionSelected}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={(suggestion) => (
              <div>{suggestion.display_name}</div>
            )}
            inputProps={inputProps}
          />
        </div>
      </Form.Group>

      <Button
        variant="primary"
        className="submit-button"
        disabled={!shouldEnableButton()}
        onClick={handleCreateComplaint}
      >
        {t("submit_button_text")}
      </Button>
    </Form>
  );
};

export default ComplaintForm;
