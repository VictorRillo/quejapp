import React from "react";
import './CustomCard.scss'

export default function CustomCard({
  title,
  content
}: {
  title: string;
  content: string;
}) {
  return (
    <div className="card-container">
      <div className="card-title">{title}</div>
      <div className="card-content">{content}</div>
    </div>
  );
}
