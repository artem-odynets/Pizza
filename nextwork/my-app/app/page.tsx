import Counter from "./Counter"
type User = {
  name: string;
}

export default function Page () {
  const name: User = {
    name: 'Artem',
  }
  return (
    <div>
    <div>Hello, {name.name}</div>
    <Counter/>
    </div>
  )
}