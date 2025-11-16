export default function ButtonAdd() {
   const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation(); 
  };

  return (

    <button className="add" onClick={handleClick}>Добавить</button>
  )
}
