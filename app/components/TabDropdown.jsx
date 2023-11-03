import React from 'react'

const TabDropdown = ({selectedTab,setSelectedTab,setSelectedOption,tabArray}) => {
  return (
    <select
    value={selectedTab}
    onChange={(e) =>{ setSelectedTab(e.target.value);setSelectedOption("All")}}
    className="w-32 bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500 focus:bg-white focus:text-gray-900"
  >
    {tabArray.map((item) => (
      <option key={item} value={item}>
        {item}
      </option>
    ))}
  </select>
  )
}

export default TabDropdown