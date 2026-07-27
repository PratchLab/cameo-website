const fs = require('fs');

const css = `
/* -------------------------------------- */
/* CATALOGUE INJECTED STYLES */
/* -------------------------------------- */
.product-desc {
  font-size: 0.9rem;
  color: #6C5A4F;
  margin: -0.5rem 0 1rem 0;
  line-height: 1.4;
  font-style: italic;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.category-features {
  margin: 4rem auto;
  padding: 2.5rem;
  max-width: 900px;
  background-color: #FDFBF7;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(92, 77, 67, 0.05);
  border: 1px solid #E6D5C3;
}

.category-features h3 {
  font-size: 1.6rem;
  color: #5C4D43;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 700;
}

.category-features ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1rem 2rem;
}

.category-features li {
  font-size: 1.05rem;
  color: #332822;
  line-height: 1.5;
  padding-left: 0.5rem;
}

@media (max-width: 768px) {
  .category-features ul {
    grid-template-columns: 1fr;
  }
}
`;

fs.appendFileSync('/Users/pratch/Downloads/Project/Cameo Website/style.css', css);
console.log('Appended CSS successfully.');
