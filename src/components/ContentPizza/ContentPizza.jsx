import ButtonCollect from "../ui/ButtonCollect/ButtonCollect";
import ButtonAdd from "../ui/ButtonAdd/ButtonAdd";
import SkeletonPizza from "./SkeletonPizza";
import { Link } from "react-router-dom";
export default function ContentPizza({items, loading, limit}) {
  const displayedItems = limit ? items.slice(0, limit) : items;
  return (
     <section className='content_pizza'>
      {loading
    ? [...new Array(limit || 6)].map((_, i) => <SkeletonPizza key={i} />)
    : displayedItems.map((item) => (
        <Link 
          to={`/pizza/${item.id}`} 
          key={item.id} 
          className="pizza-item"
        >
         <div className='block_content'>
                <img src={item.image}/>
                <div className="wrapper_desc">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
               
            <div className="wrapper_price">
                <span>от {item.price}$</span>
                <ButtonAdd />
                </div>
                 </div>
      </div>
      </Link>
      ))}
    </section>

  )
}
