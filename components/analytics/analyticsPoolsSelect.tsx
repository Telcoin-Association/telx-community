import React from "react";


export interface AnalyticsPoolsSelectProps {
  selectedPools: any;
  pools: any;
  handlePoolChange: any;
}

export default function AnalyticsPoolsSelect(props: AnalyticsPoolsSelectProps) {

  const { 
    selectedPools, 
    pools,
    handlePoolChange
  } = props;

  const [showPoolsSelect, setShowPoolsSelect] = React.useState(false);

  const handleDropdownOnClick = () => {
    setShowPoolsSelect(!showPoolsSelect);
  }

  return (
    <div className="analytics-pools-select">
      {showPoolsSelect}
      <div className="analytics-pools-select-dropdown" onClick={handleDropdownOnClick}>
        { selectedPools.length < 1 && 'All Pools' }
        {
          selectedPools.map( (pool: { name: string; }, i: number) => {
            const { name } = pool;

            console.log('name', name)
            return(
              <div key={i}>
                { name !== '' ? name : 'All Pools' }
              </div>
            )
          })
        }
      </div>

      {
        showPoolsSelect && (
          <div className="analytics-pools-select-options">
          <ul className="analytics-chart-filter">
            {
              pools.map((pool: { name: string; }, i: number) => {
                const { name } = pool;
                const handleOnClick = () => {
                  handlePoolChange([pool])
                  setShowPoolsSelect(false)
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
