
import React from "react";

export interface AnalyticsSnapshotProps {
    
}

export default function AnalyticsSnapshot(props: AnalyticsSnapshotProps) {

  const values = {
    totalVolume: [
      {
        protocol: 'All',
        value: '$987,959,489.44'
      },
      {
        protocol: 'Quickswap',
        value: '$670,306,795.93'
      },
      {
        protocol: 'Balancer',
        value: '$226,668,353.90'
      },
      {
        protocol: 'DFX',
        value: '$107,036,647.53'
      },
    ],
    totalFees: [
      {
        protocol: 'All',
        value: '$2,495,471.98'
      },
      {
        protocol: 'Quickswap',
        value: '$2,010,920.39'
      },
      {
        protocol: 'Balancer',
        value: '$453,336.71'
      },
      {
        protocol: 'DFX',
        value: '$53,518.32'
      },
    ],
  }
  
  return (
    <div id="analytics-snapshot" className="analytics-section">

      <div className="analytics-section-header">
        <h2>TELx Protocol Snapshot</h2>
      </div>

      <div className="analytics-section-body">
        <div className="analytics-snapshot-volume">
          <h4>Total Trade Volume to Date</h4>
          {
            values.totalVolume.map((obj, i) => {
              const { protocol, value } = obj;
              return (
                <div className="protocol-value-pair" key={i}>
                  <p>{protocol}</p>
                  <p>{value}</p>
                </div>
              )
            })
          }
        </div>

        <div className="analytics-snapshot-fees">
          <h4>Total Fees Earned to Date</h4>
          {
            values.totalFees.map((obj, i) => {
              const { protocol, value } = obj;
              return (
                <div className="protocol-value-pair" key={i}>
                  <p>{protocol}</p>
                  <p>{value}</p>
                </div>
              )
            })
          }
        </div>
      </div>

    </div>
  );
}
