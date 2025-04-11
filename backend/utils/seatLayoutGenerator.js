const generateSeatLayout = (rows, cols) => {
    const layout = [];
    for (let i = 0; i < rows; i++) {
      const row = new Array(cols).fill(1); // 1 represents an available seat
      layout.push(row);
    }
    return layout;
  };
  
  module.exports = { generateSeatLayout };
  