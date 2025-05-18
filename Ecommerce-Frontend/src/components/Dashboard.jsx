import React, { useEffect, useRef } from 'react';
import * as powerbi from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';

const Dashboard = () => {
  // Replace these with your actual Power BI configuration
  const config = {
    type: 'report', // or 'dashboard'
    tokenType: powerbi.models.TokenType.Embed,
    accessToken: 'YOUR_ACCESS_TOKEN', // You'll need to get this from your backend
    embedUrl: 'YOUR_EMBED_URL', // You'll need to get this from Power BI
    id: 'YOUR_REPORT_ID', // You'll need to get this from Power BI
    settings: {
      panes: {
        filters: {
          visible: true
        },
        pageNavigation: {
          visible: true
        }
      }
    }
  };

  return (
    <div className="dashboard-container" style={{ height: '100vh', width: '100%' }}>
      <h1>Analytics Dashboard</h1>
      <div style={{height: '80vh', width: '100%'}}>
        <PowerBIEmbed
            embedConfig={config}
            eventHandlers={
              new Map([
                ['loaded', function () {
                  console.log('Report loaded');
                }],
                ['rendered', function () {
                  console.log('Report rendered');
                }],
                ['error', function (event) {
                  console.error(event.detail);
                }]
              ])
            }
            cssClassName="report-container"
            getEmbeddedComponent={(embeddedReport) => {
              window.report = embeddedReport;
            }}
        />
        <iframe title="Ecomm Bi project" width="1140" height="541.25"
                src="https://app.powerbi.com/reportEmbed?reportId=7464f3ec-9141-4578-b99b-b0a1220c572c&autoAuth=true&embeddedDemo=true"
                frameBorder="0" allowFullScreen="true"></iframe>
      </div>
    </div>
  );
};

export default Dashboard; 