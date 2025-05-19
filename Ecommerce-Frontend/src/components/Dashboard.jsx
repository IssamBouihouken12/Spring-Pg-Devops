import React, { useEffect, useRef } from 'react';
import * as powerbi from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';
import './Dashboard.css';

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
    <div >
     passer au premuim
    </div>
  );
};

export default Dashboard; 