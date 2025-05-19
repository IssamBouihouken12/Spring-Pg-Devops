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
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <h1>E-Commerce Analytics Dashboard</h1>
        <div className="dashboard-controls">
          <button className="refresh-btn">
            <i className="fas fa-sync-alt"></i> Refresh
          </button>
          <button className="export-btn">
            <i className="fas fa-download"></i> Export
          </button>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-sidebar">
          <div className="sidebar-section">
            <h3>Quick Stats</h3>
            <div className="stat-card">
              <i className="fas fa-shopping-cart"></i>
              <div className="stat-info">
                <span className="stat-value">1,234</span>
                <span className="stat-label">Total Orders</span>
              </div>
            </div>
            <div className="stat-card">
              <i className="fas fa-users"></i>
              <div className="stat-info">
                <span className="stat-value">567</span>
                <span className="stat-label">Active Users</span>
              </div>
            </div>
            <div className="stat-card">
              <i className="fas fa-dollar-sign"></i>
              <div className="stat-info">
                <span className="stat-value">$45,678</span>
                <span className="stat-label">Revenue</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-main">
          <div className="powerbi-container">
            <PowerBIEmbed
              embedConfig={config}
              eventHandlers={
                new Map([
                  ['loaded', function () { console.log('Report loaded'); }],
                  ['rendered', function () { console.log('Report rendered'); }],
                  ['error', function (event) { console.error(event.detail); }]
                ])
              }
              cssClassName="report-container"
              getEmbeddedComponent={(embeddedReport) => {
                window.report = embeddedReport;
              }}
            />
          </div>
          
          <div className="powerbi-iframe-container">
            <iframe 
              title="Ecomm Bi project" 
              src="https://app.powerbi.com/reportEmbed?reportId=7464f3ec-9141-4578-b99b-b0a1220c572c&autoAuth=true&embeddedDemo=true"
              frameBorder="0" 
              allowFullScreen="true"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 