import ButtonCollect from "../ui/ButtonCollect/ButtonCollect";
import ButtonAdd from "../ui/ButtonAdd/ButtonAdd";
import SkeletonPizza from "./SkeletonPizza";

export default function ContentPizza({items, loading}) {
  return (
     <section className='content_pizza'>
      {loading
    ? [...new Array(6)].map((_, i) => <SkeletonPizza key={i} />)
    : items.map((item) => (
         <div className='block_content'>
                <img src={item.image}/>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
            <div className="wrapper_price">
                <span>от {item.price}$</span>
                <ButtonAdd/>
                </div>
      </div>
      ))}
    </section>

  )
}
