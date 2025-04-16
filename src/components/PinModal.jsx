"use client"

import "./PinModal.css"

function PinModal({ pin, onClose }) {
  // Prevent clicks inside the modal from closing it
  const handleModalClick = (e) => {
    e.stopPropagation()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={handleModalClick}>
        {/* Close button */}
        <button className="modal-close-button" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Image section */}
        <div className="modal-image-section">
          <img src={pin.image || "/placeholder.svg"} alt={pin.title} className="modal-image" />
        </div>

        {/* Content section */}
        <div className="modal-content-section">
          {/* Action buttons */}
          <div className="modal-actions">
            <button className="modal-action-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
            </button>
            <button className="modal-action-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
            </button>
            <button className="modal-action-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </button>
          </div>

          {/* Title and description */}
          <h2 className="modal-title">{pin.title}</h2>
          <p className="modal-description">{pin.description}</p>

          {/* User info */}
          <div className="modal-user">
            <img src={pin.userAvatar || "/placeholder.svg"} alt={pin.user} className="modal-user-avatar" />
            <div className="modal-user-info">
              <p className="modal-user-name">{pin.user}</p>
              <p className="modal-user-role">Creator</p>
            </div>
            <button className="modal-follow-button">Follow</button>
          </div>

          {/* Stats */}
          <div className="modal-stats">
            <div className="modal-stat">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span>{pin.likes}</span>
            </div>
            <div className="modal-stat">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              <span>{pin.comments}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="modal-tags">
            {pin.tags.map((tag) => (
              <span key={tag} className="modal-tag">
                #{tag}
              </span>
            ))}
          </div>

          {/* Comments section placeholder */}
          <div className="modal-comments">
            <h3 className="modal-comments-title">Comments</h3>
            <div className="modal-comment">
              <img src="/placeholder.svg?height=40&width=40" alt="User" className="modal-comment-avatar" />
              <div className="modal-comment-content">
                <p className="modal-comment-user">RandomUser</p>
                <p className="modal-comment-text">This is amazing! Thanks for sharing.</p>
              </div>
            </div>

            {/* Comment input */}
            <div className="modal-comment-input-container">
              <img src="/placeholder.svg?height=40&width=40" alt="Current user" className="modal-comment-avatar" />
              <input type="text" placeholder="Add a comment" className="modal-comment-input" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PinModal
