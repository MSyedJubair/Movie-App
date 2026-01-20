
const Search = ({SearchTerm, setSearchTerm}) => {
  return (
    <div tabIndex={0} className='search rounded-full focus-within:border-indigo-900 border transition-all duration-300'>
      <div className="">
        <img src="./search.svg" alt="" />
        <input 
            type="text" 
            placeholder='Search though 300+ movies online'
            onChange={(e) => {
                setSearchTerm(e.target.value)
                }
            }
        />
      </div>
    </div>
  )
}

export default Search
