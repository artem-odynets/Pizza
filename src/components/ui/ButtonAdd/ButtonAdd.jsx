export default function ButtonAdd({ onClick }) {
  return (
    <button 
      className="add" 
      onClick={(e) => {
        if (onClick) {
          onClick(e); 
        }
      }}
    >
       Додати
    </button>
  );
}