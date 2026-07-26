const fs = require('fs');

const css = `
/* -------------------------------------- */
/* 6 TOP PICKS SECTION (Inspired by Catalog) */
/* -------------------------------------- */
.top-picks-section {
  padding: 5rem 2rem;
  background-color: #FDFBF7;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}

.top-picks-header {
  text-align: left;
  margin-bottom: 3rem;
  border-bottom: 2px solid #8A6A51;
  display: inline-block;
  padding-bottom: 0.5rem;
}

.top-picks-title {
  font-size: 3rem;
  font-weight: 800;
  color: #5C4D43;
  letter-spacing: 2px;
  margin: 0;
  line-height: 1;
}

.top-picks-title span {
  font-size: 5rem;
  color: #8A6A51;
  vertical-align: bottom;
  line-height: 0.8;
}

.top-picks-subtitle {
  font-family: 'Brush Script MT', cursive, 'Inter', sans-serif;
  font-size: 1.8rem;
  color: #333;
  margin-top: -10px;
  margin-left: 50px;
  font-style: italic;
}

.top-picks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-top: 2rem;
}

.top-pick-card {
  position: relative;
  background: #FFF;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(92, 77, 67, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
}

.top-pick-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(92, 77, 67, 0.15);
}

.pick-number {
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 8rem;
  font-weight: 900;
  color: #8A6A51;
  opacity: 0.15;
  z-index: -1;
  line-height: 1;
}

.pick-img {
  width: 100%;
  max-width: 220px;
  height: 220px;
  object-fit: contain;
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;
}

.top-pick-card:hover .pick-img {
  transform: scale(1.1);
}

.top-pick-card:hover .pick-img.rotate-diagonal {
  transform: scale(1.1) rotate(25deg);
}
.top-pick-card:hover .pick-img.rotate-diagonal-reverse {
  transform: scale(1.1) rotate(-25deg);
}

.pick-info {
  text-align: center;
}

.pick-badge {
  display: inline-block;
  background-color: #E6D5C3;
  color: #5C4D43;
  padding: 0.3rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
}

.pick-info h4 {
  font-size: 1.1rem;
  color: #332822;
  margin-bottom: 1rem;
  font-weight: 600;
}

.pick-info p {
  font-size: 0.95rem;
  color: #6C5A4F;
  font-style: italic;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .top-picks-title { font-size: 2.2rem; }
  .top-picks-title span { font-size: 3.5rem; }
  .top-picks-subtitle { font-size: 1.4rem; margin-left: 30px; }
  .top-picks-grid { grid-template-columns: 1fr; gap: 2rem; }
}
`;

fs.appendFileSync('/Users/pratch/Downloads/Project/Cameo Website/style.css', css);
console.log('Appended CSS successfully.');
