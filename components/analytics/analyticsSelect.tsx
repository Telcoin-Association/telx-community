import React from "react";


export interface AnalyticsSelectProps {
  selected: any;
  options: any;
  handleChange: any;
}

export default function AnalyticsSelect(props: AnalyticsSelectProps) {

  const { 
    selected, 
    options,
    handleChange
  } = props;

  const [showOptionsSelect, setShowoptionsSelect] = React.useState(false);

  const handleDropdownOnClick = () => {
    setShowoptionsSelect(!showOptionsSelect);
  }

  console.log('selected', selected)
  console.log('options', options)

  return (
    <div className="analytics-select">
      {showOptionsSelect}
      <div className="analytics-select-dropdown" onClick={handleDropdownOnClick}>
        { selected === null ? 'All Types' : selected.name }
      </div>

      {
        showOptionsSelect && (
          <div className="analytics-select-options">
          <ul className="analytics-select-filter">
            {
              options.map((option: { name: string; }, i: number) => {
                const { name } = option;
                const handleOnClick = () => {
                  handleChange(option)
                  setShowoptionsSelect(false)
                }
  
                return (
                  <li key={i} onClick={handleOnClick}>
                    <p>{name}</p>
                  </li>
                )
              }) 
            }
          </ul>
        </div>
        )
      }
    </div>
  )
}
