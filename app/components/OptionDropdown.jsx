import React from 'react'

const OptionDropdown = ({selectedOption,setSelectedOption,options,selectedTab}) => {
  return (
    <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="w-32 bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500 focus:bg-white focus:text-gray-900"
            >
              <option value="All">All</option>
              {options[selectedTab]?.map((item) => (
                <option key={item.Data} value={item.URL}>
                  {item.Data}
                </option>
              ))}
            </select>
  )
}

export default OptionDropdown