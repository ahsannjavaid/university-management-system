import React from 'react'

export default function ActivityCard({ header, children, isExpanded, handleExpanded }) {
  return (
    <div
      className="card shadow shadow-sm rounded"
      style={{
        pointerEvents: "auto"
      }}
    >
      <div
        className="card-header text-center rounded cursor-pointer"
        onClick={handleExpanded}
      >
        {header}
      </div>
      {isExpanded && <div className="card-body">{children}</div>}
    </div>
  )
}
