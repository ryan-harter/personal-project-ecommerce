import React from 'react'
import './css/Landing.css'

export default function Landing() {
  return (
    <div id='landing-page'>
      <h1>Shop by</h1>
      <div className="category-card">
        <h3>Franchise</h3>
      </div>
      <div className="category-card">
        <h3>Apparel</h3>
      </div>
      <div className="category-card">
        <h3>Collectibles</h3>
      </div>
      <div className="category-card">
        <h3>Artwork</h3>
      </div>

    </div>
  )
}
