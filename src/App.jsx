
import React, { useState, useEffect, useCallback } from 'react';
import {
  FaSearch, FaUserCircle, FaSignOutAlt, FaPlus, FaChevronLeft, FaChartPie, FaBuilding, FaClipboardCheck,
  FaFileContract, FaExclamationTriangle, FaHourglassHalf, FaCheckCircle, FaTimesCircle, FaHammer, FaLock,
  FaCog, FaFileAlt, FaHistory, FaBullseye, FaChartLine, FaChartBar, FaUserShield
} from 'react-icons/fa';
import { GiGears } from 'react-icons/gi';
import { CgDanger } from 'react-icons/cg';
import { MdOutlineAssessment } from 'react-icons/md';
import { IoAlertCircleSharp } from 'react-icons/io5';

// --- DUMMY DATA ---
const DUMMY_DATA = {
  vendors: [
    { id: 'V001', name: 'GlobalTech Solutions', status: 'Active', riskScore: 750, complianceStatus: 'Compliant', onboardingStatus: 'Approved', type: 'Software', contractEndDate: '2024-12-31', contact: 'alice@globaltech.com', annualRevenue: '1.2B', employeeCount: '5000', lastAuditDate: '2024-03-15', nextAuditDate: '2025-03-15', documents: [{ name: 'MSA_GlobalTech.pdf', url: '#' }, { name: 'SOC2_GlobalTech.pdf', url: '#' }], relatedRisks: ['RAS003'] },
    { id: 'V002', name: 'Innovate Logistics Inc.', status: 'Active', riskScore: 520, complianceStatus: 'Pending Review', onboardingStatus: 'Approved', type: 'Logistics', contractEndDate: '2025-06-15', contact: 'bob@innovatelog.com', annualRevenue: '500M', employeeCount: '1200', lastAuditDate: '2023-08-01', nextAuditDate: '2024-05-01', documents: [{ name: 'LogisticsAgreement.pdf', url: '#' }], relatedRisks: ['RAS002'] },
    { id: 'V003', name: 'SecureData Systems', status: 'Onboarding', riskScore: null, complianceStatus: 'Draft', onboardingStatus: 'In Progress', type: 'Cybersecurity', contractEndDate: null, contact: 'carol@securedat.com', annualRevenue: '100M', employeeCount: '300', lastAuditDate: null, nextAuditDate: null, documents: [], relatedRisks: [] },
    { id: 'V004', name: 'FastDeliver Services', status: 'High Risk', riskScore: 310, complianceStatus: 'Non-Compliant', onboardingStatus: 'Approved', type: 'Delivery', contractEndDate: '2023-10-01', contact: 'dave@fastdeliver.com', annualRevenue: '80M', employeeCount: '700', lastAuditDate: '2024-04-01', nextAuditDate: '2025-04-01', documents: [{ name: 'DeliveryContract_Exp.pdf', url: '#' }], relatedRisks: ['RAS001'] },
    { id: 'V005', name: 'EcoGreen Energy', status: 'Active', riskScore: 880, complianceStatus: 'Compliant', onboardingStatus: 'Approved', type: 'Energy', contractEndDate: '2026-03-20', contact: 'eve@ecogreen.com', annualRevenue: '2.5B', employeeCount: '10000', lastAuditDate: '2024-01-01', nextAuditDate: '2025-01-01', documents: [{ name: 'GreenEnergy_Cert.pdf', url: '#' }], relatedRisks: [] },
    { id: 'V006', name: 'CloudCompute Co.', status: 'Active', riskScore: 680, complianceStatus: 'Compliant', onboardingStatus: 'Approved', type: 'Cloud', contractEndDate: '2025-09-01', contact: 'frank@cloudcompute.com', annualRevenue: '900M', employeeCount: '3000', lastAuditDate: '2024-02-10', nextAuditDate: '2025-02-10', documents: [{ name: 'CloudSLA.pdf', url: '#' }] },
    { id: 'V007', name: 'FinFlow Services', status: 'Onboarding', riskScore: null, complianceStatus: 'Pending Review', onboardingStatus: 'Submitted', type: 'Finance', contractEndDate: null, contact: 'grace@finflow.com', annualRevenue: '150M', employeeCount: '400', lastAuditDate: null, nextAuditDate: null, documents: [] },
    { id: 'V008', name: 'NextGen Marketing', status: 'High Risk', riskScore: 450, complianceStatus: 'Non-Compliant', onboardingStatus: 'Approved', type: 'Marketing', contractEndDate: '2024-01-15', contact: 'heidi@nextgen.com', annualRevenue: '70M', employeeCount: '200', lastAuditDate: '2023-11-01', nextAuditDate: '2024-11-01', documents: [{ name: 'MarketingTerms.pdf', url: '#' }] },
    { id: 'V009', name: 'DataSecure Solutions', status: 'Active', riskScore: 710, complianceStatus: 'Compliant', onboardingStatus: 'Approved', type: 'Cybersecurity', contractEndDate: '2025-10-20', contact: 'ivan@datasecure.com', annualRevenue: '200M', employeeCount: '600', lastAuditDate: '2024-01-20', nextAuditDate: '2025-01-20', documents: [{ name: 'SecurityPolicy.pdf', url: '#' }] },
    { id: 'V010', name: 'GlobalLogistics Partners', status: 'Active', riskScore: 600, complianceStatus: 'Compliant', onboardingStatus: 'Approved', type: 'Logistics', contractEndDate: '2026-04-01', contact: 'judy@globallog.com', annualRevenue: '300M', employeeCount: '900', lastAuditDate: '2024-03-01', nextAuditDate: '2025-03-01', documents: [{ name: 'LogisticsSLA.pdf', url: '#' }] },
  ],
  onboardingRequests: [
    { id: 'ONB001', vendorId: 'V003', vendorName: 'SecureData Systems', status: 'In Progress', initiator: 'Procurement', currentStage: 'Procurement Review', slaStatus: 'On Track', workflowHistory: [{ stage: 'Draft', date: '2024-04-10' }, { stage: 'Submitted', date: '2024-04-12' }], form: { name: 'SecureData Systems', type: 'Cybersecurity', contact: 'carol@securedat.com' } },
    { id: 'ONB002', vendorId: 'V007', vendorName: 'FinFlow Services', status: 'Submitted', initiator: 'Procurement', currentStage: 'Compliance Review', slaStatus: 'Near Breach', workflowHistory: [{ stage: 'Draft', date: '2024-04-01' }, { stage: 'Submitted', date: '2024-04-02' }, { stage: 'Procurement Review', date: '2024-04-05' }], form: { name: 'FinFlow Services', type: 'Finance', contact: 'grace@finflow.com' } },
    { id: 'ONB003', vendorId: 'V001', vendorName: 'GlobalTech Solutions', status: 'Approved', initiator: 'Procurement', currentStage: 'Completed', slaStatus: 'Completed', workflowHistory: [{ stage: 'Draft', date: '2024-03-01' }, { stage: 'Submitted', date: '2024-03-02' }, { stage: 'Procurement Review', date: '2024-03-05' }, { stage: 'Compliance Review', date: '2024-03-10' }, { stage: 'Approved', date: '2024-03-12' }], form: { name: 'GlobalTech Solutions', type: 'Software', contact: 'alice@globaltech.com' } },
    { id: 'ONB004', vendorId: 'V004', vendorName: 'FastDeliver Services', status: 'Rejected', initiator: 'Procurement', currentStage: 'Rejected', slaStatus: 'N/A', workflowHistory: [{ stage: 'Draft', date: '2023-09-01' }, { stage: 'Submitted', date: '2023-09-02' }, { stage: 'Procurement Review', date: '2023-09-05' }, { stage: 'Rejected', date: '2023-09-07', reason: 'Failed financial check' }], form: { name: 'FastDeliver Services', type: 'Delivery', contact: 'dave@fastdeliver.com' } },
    { id: 'ONB005', vendorId: 'V010', vendorName: 'GlobalLogistics Partners', status: 'Submitted', initiator: 'Procurement', currentStage: 'Procurement Review', slaStatus: 'On Track', workflowHistory: [{ stage: 'Draft', date: '2024-04-15' }, { stage: 'Submitted', date: '2024-04-16' }], form: { name: 'GlobalLogistics Partners', type: 'Logistics', contact: 'judy@globallog.com' } },
  ],
  auditReports: [
    { id: 'AUD001', vendorId: 'V001', vendorName: 'GlobalTech Solutions', type: 'Annual Compliance', status: 'Completed', date: '2024-03-15', findings: 'Minor documentation gaps resolved.', assignedTo: 'Compliance Officer', slaStatus: 'Completed', workflowHistory: [{ stage: 'Scheduled', date: '2024-02-01' }, { stage: 'In Progress', date: '2024-02-15' }, { stage: 'Review', date: '2024-03-01' }, { stage: 'Completed', date: '2024-03-15' }], auditForm: { type: 'Annual Compliance', description: 'Review of annual compliance posture and documentation.' } },
    { id: 'AUD002', vendorId: 'V004', vendorName: 'FastDeliver Services', type: 'Financial Review', status: 'Pending Review', date: '2024-04-01', findings: 'High-risk financial indicators detected. Requires deeper investigation.', assignedTo: 'Compliance Officer', slaStatus: 'Near Breach', workflowHistory: [{ stage: 'Scheduled', date: '2024-03-10' }, { stage: 'In Progress', date: '2024-03-20' }], auditForm: { type: 'Financial Review', description: 'Deep dive into financial stability metrics.' } },
    { id: 'AUD003', vendorId: 'V002', vendorName: 'Innovate Logistics Inc.', type: 'Operational Security', status: 'Scheduled', date: '2024-05-01', findings: null, assignedTo: 'Compliance Officer', slaStatus: 'On Track', workflowHistory: [{ stage: 'Scheduled', date: '2024-04-10' }], auditForm: { type: 'Operational Security', description: 'Assessment of operational security protocols and controls.' } },
    { id: 'AUD004', vendorId: 'V009', vendorName: 'DataSecure Solutions', type: 'Data Privacy', status: 'In Progress', date: '2024-04-25', findings: null, assignedTo: 'Compliance Officer', slaStatus: 'On Track', workflowHistory: [{ stage: 'Scheduled', date: '2024-04-05' }, { stage: 'In Progress', date: '2024-04-15' }], auditForm: { type: 'Data Privacy', description: 'Review of data handling, privacy policies, and GDPR compliance.' } },
    { id: 'AUD005', vendorId: 'V008', vendorName: 'NextGen Marketing', type: 'Ad Campaign Compliance', status: 'Completed', date: '2023-11-20', findings: 'Minor non-compliance in ad disclosures. Remediation advised.', assignedTo: 'Compliance Officer', slaStatus: 'Completed', workflowHistory: [{ stage: 'Scheduled', date: '2023-10-01' }, { stage: 'In Progress', date: '2023-10-15' }, { stage: 'Review', date: '2023-11-01' }, { stage: 'Completed', date: '2023-11-20' }], auditForm: { type: 'Ad Campaign Compliance', description: 'Review of marketing campaigns for regulatory compliance.' } },
  ],
  riskAssessments: [
    { id: 'RAS001', vendorId: 'V004', vendorName: 'FastDeliver Services', type: 'Financial Instability', status: 'Action Required', date: '2024-04-05', scoreImpact: -150, description: 'Significant liquidity concerns identified, immediate action recommended.', recommendations: 'Review contract terms, explore alternative vendors, demand financial transparency.', assignedTo: 'Risk Analyst', slaStatus: 'SLA Breach', workflowHistory: [{ stage: 'Initiated', date: '2024-03-20' }, { stage: 'Data Gathering', date: '2024-03-25' }, { stage: 'Analysis', date: '2024-04-01' }], riskForm: { type: 'Financial Instability', impact: 'High', mitigatingActions: 'Contract review, backup vendor identification.' } },
    { id: 'RAS002', vendorId: 'V002', vendorName: 'Innovate Logistics Inc.', type: 'Geopolitical Risk', status: 'In Progress', date: '2024-04-18', scoreImpact: -50, description: 'Operations in volatile region, potential supply chain disruption.', recommendations: 'Monitor situation closely, diversify logistics partners.', assignedTo: 'Risk Analyst', slaStatus: 'On Track', workflowHistory: [{ stage: 'Initiated', date: '2024-04-15' }], riskForm: { type: 'Geopolitical Risk', impact: 'Medium', mitigatingActions: 'Geo-political monitoring, partner diversification.' } },
    { id: 'RAS003', vendorId: 'V001', vendorName: 'GlobalTech Solutions', type: 'Cyber Security Posture', status: 'Approved', date: '2024-03-20', scoreImpact: 0, description: 'Strong security controls and robust incident response plan.', recommendations: 'Continue quarterly reviews, encourage threat intelligence sharing.', assignedTo: 'Risk Analyst', slaStatus: 'Completed', workflowHistory: [{ stage: 'Initiated', date: '2024-03-01' }, { stage: 'Data Gathering', date: '2024-03-05' }, { stage: 'Analysis', date: '2024-03-10' }, { stage: 'Recommendation', date: '2024-03-15' }, { stage: 'Approved', date: '2024-03-20' }], riskForm: { type: 'Cyber Security Posture', impact: 'Low', mitigatingActions: 'Regular vulnerability scans, security awareness training.' } },
    { id: 'RAS004', vendorId: 'V005', vendorName: 'EcoGreen Energy', type: 'Environmental Impact', status: 'Completed', date: '2024-01-10', scoreImpact: -10, description: 'Minor concerns regarding waste disposal practices.', recommendations: 'Suggest improvements in waste management and reporting.', assignedTo: 'Risk Analyst', slaStatus: 'Completed', workflowHistory: [{ stage: 'Initiated', date: '2023-12-01' }, { stage: 'Data Gathering', date: '2023-12-05' }, { stage: 'Analysis', date: '2023-12-15' }, { stage: 'Recommendation', date: '2023-12-20' }, { stage: 'Approved', date: '2024-01-10' }], riskForm: { type: 'Environmental Impact', impact: 'Low', mitigatingActions: 'Recommend sustainable practices.' } },
    { id: 'RAS005', vendorId: 'V006', vendorName: 'CloudCompute Co.', type: 'Data Residency Compliance', status: 'Submitted', date: '2024-04-20', scoreImpact: -30, description: 'Potential issues with data storage locations for certain sensitive data types.', recommendations: 'Clarify data residency agreements, explore regional data centers.', assignedTo: 'Risk Analyst', slaStatus: 'On Track', workflowHistory: [{ stage: 'Initiated', date: '2024-04-10' }, { stage: 'Data Gathering', date: '2024-04-15' }], riskForm: { type: 'Data Residency Compliance', impact: 'Medium', mitigatingActions: 'Review cloud agreements, ensure data localization.' } },
    { id: 'RAS006', vendorId: 'V008', vendorName: 'NextGen Marketing', type: 'Reputational Risk', status: 'Action Required', date: '2024-02-01', scoreImpact: -80, description: 'Recent negative media coverage due to unethical marketing practices.', recommendations: 'Develop crisis communication plan, review marketing ethics policy.', assignedTo: 'Risk Analyst', slaStatus: 'SLA Breach', workflowHistory: [{ stage: 'Initiated', date: '2024-01-10' }, { stage: 'Data Gathering', date: '2024-01-15' }, { stage: 'Analysis', date: '2024-01-25' }], riskForm: { type: 'Reputational Risk', impact: 'High', mitigatingActions: 'PR strategy, ethical policy enforcement.' } },
  ],
  activityLogs: [
    { id: 'LOG001', timestamp: '2024-04-23T10:30:00Z', user: 'Procurement Manager', action: 'Approved Onboarding Request', entityType: 'OnboardingRequest', entityId: 'ONB001', details: 'Approved SecureData Systems for next stage.' },
    { id: 'LOG002', timestamp: '2024-04-23T09:15:00Z', user: 'Compliance Officer', action: 'Updated Audit Report', entityType: 'AuditReport', entityId: 'AUD002', details: 'Added financial findings for FastDeliver Services.' },
    { id: 'LOG003', timestamp: '2024-04-22T16:00:00Z', user: 'Risk Analyst', action: 'Initiated Risk Assessment', entityType: 'RiskAssessment', entityId: 'RAS002', details: 'Started geopolitical risk assessment for Innovate Logistics.' },
    { id: 'LOG004', timestamp: '2024-04-22T14:00:00Z', user: 'Procurement Manager', action: 'Created Vendor Record', entityType: 'Vendor', entityId: 'V003', details: 'New vendor record for SecureData Systems.' },
    { id: 'LOG005', timestamp: '2024-04-21T11:00:00Z', user: 'Compliance Officer', action: 'Scheduled Audit', entityType: 'AuditReport', entityId: 'AUD003', details: 'Scheduled operational security audit for Innovate Logistics Inc..' },
    { id: 'LOG006', timestamp: '2024-04-20T08:00:00Z', user: 'Risk Analyst', action: 'Submitted Risk Assessment', entityType: 'RiskAssessment', entityId: 'RAS005', details: 'Submitted data residency compliance assessment for CloudCompute Co.' },
    { id: 'LOG007', timestamp: '2024-04-19T17:00:00Z', user: 'Procurement Manager', action: 'Rejected Onboarding Request', entityType: 'OnboardingRequest', entityId: 'ONB004', details: 'Rejected FastDeliver Services due to financial risk.' },
    { id: 'LOG008', timestamp: '2024-04-18T10:00:00Z', user: 'Executive Sponsor', action: 'Viewed Dashboard', entityType: 'Dashboard', entityId: 'Executive', details: 'Accessed overall enterprise risk dashboard.' },
    { id: 'LOG009', timestamp: '2024-04-17T14:30:00Z', user: 'Compliance Officer', action: 'Completed Audit', entityType: 'AuditReport', entityId: 'AUD001', details: 'Completed annual compliance audit for GlobalTech Solutions.' },
    { id: 'LOG010', timestamp: '2024-04-16T09:00:00Z', user: 'Risk Analyst', action: 'Updated Risk Model', entityType: 'Settings', entityId: 'RISKMODEL_V2', details: 'Adjusted weighting for geopolitical factors in risk model.' },
  ]
};

// --- RBAC & ROLE DEFINITIONS ---
const ROLES = {
  'procurement_manager': {
    label: 'Procurement Manager',
    initials: 'PM',
    canView: ['Dashboard', 'VendorList', 'VendorDetail', 'VendorForm', 'OnboardingList', 'OnboardingDetail', 'ActivityLog'],
    canCreate: ['VendorForm', 'OnboardingForm'],
    canEdit: ['VendorForm'],
    canApprove: ['OnboardingApprovalForm'],
    kpis: {
      'AverageVendorRiskScore': { value: 620, unit: 'score', trend: 'up' },
      'PendingOnboardingRequests': { value: DUMMY_DATA.onboardingRequests.filter(req => req.status !== 'Approved' && req.status !== 'Rejected').length, unit: 'requests' },
      'HighRiskVendors': { value: DUMMY_DATA.vendors.filter(v => v.status === 'High Risk').length, unit: 'vendors' }
    },
    dashboardCards: [
      { id: 'vendors_overview', title: 'Vendor Overview', icon: FaBuilding, description: 'Manage and view all vendors.', navigateTo: 'VendorList', status: 'active' },
      { id: 'pending_onboarding', title: 'Pending Onboarding', icon: FaHourglassHalf, description: 'Review new vendor requests.', navigateTo: 'OnboardingList', status: 'pending' },
      { id: 'high_risk_alerts', title: 'High-Risk Vendors', icon: CgDanger, description: 'Monitor critical vendor risks.', navigateTo: 'VendorList', filter: 'High Risk', status: 'high-risk' },
      { id: 'kpi_risk_score', title: 'Avg Vendor Risk Score', kpi: 'AverageVendorRiskScore', status: 'in-progress' },
      { id: 'kpi_onboarding_rate', title: 'Pending Onboarding', kpi: 'PendingOnboardingRequests', status: 'pending' },
      { id: 'activities', title: 'Recent Activities', icon: FaHistory, description: 'View latest system events.', navigateTo: 'ActivityLog', status: 'info' }
    ]
  },
  'compliance_officer': {
    label: 'Compliance Officer',
    initials: 'CO',
    canView: ['Dashboard', 'VendorList', 'VendorDetail', 'AuditList', 'AuditDetail', 'ComplianceReportForm', 'ActivityLog'],
    canCreate: ['AuditForm', 'ComplianceReportForm'],
    canEdit: ['VendorComplianceForm', 'AuditForm'],
    canApprove: ['AuditApprovalForm'],
    kpis: {
      'ComplianceScore': { value: 85, unit: '%', trend: 'up' },
      'OpenComplianceIssues': { value: DUMMY_DATA.auditReports.filter(ar => ar.status !== 'Completed').length, unit: 'issues' },
      'AuditCompletionRate': { value: 75, unit: '%' }
    },
    dashboardCards: [
      { id: 'open_compliance_issues', title: 'Open Compliance Issues', icon: FaClipboardCheck, description: 'Track and resolve compliance gaps.', navigateTo: 'AuditList', filter: 'Pending Review', status: 'action-required' },
      { id: 'pending_audits', title: 'Scheduled & In-Progress Audits', icon: FaHammer, description: 'Manage ongoing and planned audits.', navigateTo: 'AuditList', filter: 'Pending/In Progress', status: 'in-progress' },
      { id: 'regulatory_updates', title: 'Compliance Reports', icon: FaFileAlt, description: 'Review and generate compliance reports.', navigateTo: 'ComplianceReportForm', status: 'info' },
      { id: 'kpi_compliance_score', title: 'Avg Compliance Score', kpi: 'ComplianceScore', status: 'approved' },
      { id: 'kpi_open_issues', title: 'Open Compliance Issues', kpi: 'OpenComplianceIssues', status: 'action-required' },
      { id: 'activities', title: 'Recent Activities', icon: FaHistory, description: 'View latest system events.', navigateTo: 'ActivityLog', status: 'info' }
    ]
  },
  'risk_analyst': {
    label: 'Risk Analyst',
    initials: 'RA',
    canView: ['Dashboard', 'VendorList', 'VendorDetail', 'RiskAssessmentList', 'RiskAssessmentDetail', 'ReportViewer', 'Settings', 'ActivityLog', 'RiskAssessmentForm'],
    canCreate: ['RiskAssessmentForm', 'RiskModelForm', 'ReportConfigForm'],
    canEdit: ['RiskAssessmentForm', 'RiskModelForm'],
    canApprove: ['RiskModelApprovalForm'],
    kpis: {
      'OverallEnterpriseRiskScore': { value: 580, unit: 'score', trend: 'down' },
      'ActionRequiredAssessments': { value: DUMMY_DATA.riskAssessments.filter(ra => ra.status === 'Action Required' || ra.slaStatus === 'SLA Breach').length, unit: 'assessments' },
      'ModelAccuracy': { value: 92, unit: '%' }
    },
    dashboardCards: [
      { id: 'enterprise_risk_score', title: 'Overall Enterprise Risk', icon: FaBullseye, description: 'View aggregated risk posture.', navigateTo: 'ReportViewer', status: 'high-risk' },
      { id: 'action_required_assessments', title: 'Action Required Risks', icon: FaExclamationTriangle, description: 'Address critical risk assessments.', navigateTo: 'RiskAssessmentList', filter: 'Action Required', status: 'sla-breach' },
      { id: 'model_performance', title: 'Risk Model Configuration', icon: GiGears, description: 'Configure and refine risk models.', navigateTo: 'Settings', status: 'in-progress' },
      { id: 'kpi_enterprise_risk', title: 'Enterprise Risk Score', kpi: 'OverallEnterpriseRiskScore', status: 'high-risk' },
      { id: 'kpi_action_required', title: 'Action Required Assessments', kpi: 'ActionRequiredAssessments', status: 'action-required' },
      { id: 'activities', title: 'Recent Activities', icon: FaHistory, description: 'View latest system events.', navigateTo: 'ActivityLog', status: 'info' }
    ]
  },
  'executive_sponsor': {
    label: 'Executive Sponsor',
    initials: 'ES',
    canView: ['Dashboard', 'ReportViewer', 'ActivityLog'], // Read-only, high-level
    canCreate: [], canEdit: [], canApprove: [],
    kpis: {
      'OverallEnterpriseRiskScore': { value: 580, unit: 'score', trend: 'down' },
      'TopHighRiskVendors': { value: DUMMY_DATA.vendors.filter(v => v.status === 'High Risk').length, unit: 'vendors' },
      'MitigationPlanProgress': { value: 70, unit: '%' }
    },
    dashboardCards: [
      { id: 'overall_risk_score', title: 'Overall Risk Score', icon: FaChartPie, description: 'High-level enterprise risk overview.', navigateTo: 'ReportViewer', status: 'high-risk' },
      { id: 'strategic_mitigation', title: 'Strategic Mitigation Progress', icon: FaChartLine, description: 'Monitor key mitigation plan effectiveness.', navigateTo: 'ReportViewer', status: 'in-progress' },
      { id: 'top_risks', title: 'Top 5 High-Risk Vendors', icon: CgDanger, description: 'Identify and track top enterprise risks.', navigateTo: 'ReportViewer', status: 'high-risk' },
      { id: 'kpi_enterprise_risk_exec', title: 'Enterprise Risk Score', kpi: 'OverallEnterpriseRiskScore', status: 'high-risk' },
      { id: 'kpi_top_risks_exec', title: 'Top High-Risk Vendors', kpi: 'TopHighRiskVendors', status: 'high-risk' },
      { id: 'activities', title: 'Recent Activities', icon: FaHistory, description: 'View latest system events.', navigateTo: 'ActivityLog', status: 'info' }
    ]
  }
};

const STATUS_COLORS_MAP = {
  'Approved': 'status-approved', 'Completed': 'status-completed', 'Active': 'status-active', 'On Track': 'status-on-track', 'Compliant': 'status-compliant',
  'In Progress': 'status-in-progress', 'Assigned': 'status-assigned', 'Submitted': 'status-submitted', 'Onboarding': 'status-onboarding',
  'Pending Review': 'status-pending-review', 'Action Required': 'status-action-required', 'Near Breach': 'status-near-breach', 'Pending': 'status-pending',
  'Rejected': 'status-rejected', 'SLA Breach': 'status-sla-breach', 'Blocked': 'status-blocked', 'High Risk': 'status-high-risk', 'Non-Compliant': 'status-non-compliant',
  'Exception': 'status-exception', 'Escalation': 'status-escalation',
  'Draft': 'status-draft', 'Scheduled': 'status-scheduled', 'Archived': 'status-archived',
  'info': 'status-info' // For general informational cards
};

// Helper to get CSS class for status
const getStatusClass = (status) => {
  const normalizedStatus = status?.replace(/ /g, '-').toLowerCase() || 'default';
  const specificClass = STATUS_COLORS_MAP[status];
  if (specificClass) return `card ${specificClass}`;
  return `card status-${normalizedStatus}`;
};

// --- GLOBAL COMPONENTS ---

const ToastNotification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000); // Auto-close after 4 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast ${type}`}>
      {type === 'success' && <FaCheckCircle />}
      {type === 'error' && <FaTimesCircle />}
      {type === 'warning' && <IoAlertCircleSharp />}
      {type === 'info' && <FaInfoCircle />}
      <span>{message}</span>
    </div>
  );
};

const ToastContainer = ({ toasts, removeToast }) => (
  <div className="toast-container">
    {toasts.map((toast) => (
      <ToastNotification key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
    ))}
  </div>
);

const NoDataIllustration = ({ message, actionText, onAction }) => (
  <div className="no-data-illustration">
    <FaChartPie /> {/* A generic icon for no data */}
    <h3>{message || "No data to display."}</h3>
    {actionText && onAction && (
      <button className="button button-primary" onClick={onAction}>{actionText}</button>
    )}
  </div>
);

// --- SHARED UI COMPONENTS ---
const Breadcrumb = ({ path, navigate }) => (
  <div className="breadcrumb">
    {path.map((item, index) => (
      <React.Fragment key={item.name}>
        {index > 0 && <span>&gt;</span>}
        {item.screen && item.id ? (
          <a onClick={() => navigate(item.screen, item.id)}>{item.name}</a>
        ) : item.screen ? (
          <a onClick={() => navigate(item.screen)}>{item.name}</a>
        ) : (
          <span>{item.name}</span>
        )}
      </React.Fragment>
    ))}
  </div>
);

const DetailItem = ({ label, value }) => (
  <div className="detail-item">
    <span className="detail-item-key">{label}:</span>
    <span className="detail-item-value">{value || 'N/A'}</span>
  </div>
);

const WorkflowTracker = ({ workflowHistory, slaStatus }) => {
  const stages = ['Draft', 'Submitted', 'Procurement Review', 'Compliance Review', 'Analysis', 'Recommendation', 'Approved', 'Rejected', 'Scheduled', 'In Progress', 'Review', 'Completed'];
  const currentStageIndex = workflowHistory.length > 0 ? stages.indexOf(workflowHistory[workflowHistory.length - 1].stage) : -1;

  return (
    <div className="workflow-tracker">
      <h3 style={{ color: 'var(--color-text-light)' }}>Workflow Progress <span className={`status-badge ${getStatusClass(slaStatus).split(' ')[1]}`}>{slaStatus}</span></h3>
      {stages.map((stage, index) => {
        const stageHistory = workflowHistory.find(h => h.stage === stage);
        const isCompleted = stageHistory !== undefined;
        const isInProgress = stageHistory !== undefined && index === currentStageIndex && slaStatus !== 'Completed' && slaStatus !== 'Rejected';
        const statusClass = isCompleted ? 'completed' : (isInProgress ? 'in-progress' : 'pending');

        if (stages.indexOf(stage) > currentStageIndex && !isCompleted) return null; // Only show past and current stages, plus future if completed

        return (
          <div key={stage} className={`workflow-stage ${statusClass}`}>
            <div className="workflow-stage-icon">
              {isCompleted ? <FaCheckCircle /> : (isInProgress ? <FaHourglassHalf /> : <FaHammer />)}
            </div>
            <div className="workflow-stage-details">
              <strong>{stage}</strong>
              {stageHistory && <span> - {new Date(stageHistory.date).toLocaleDateString()}</span>}
              {stageHistory?.reason && <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-status-red)' }}>Reason: {stageHistory.reason}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// --- SCREENS ---

const LoginScreen = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState('');

  const handleLogin = () => {
    if (selectedRole) {
      onLogin(selectedRole);
    }
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        <h2>RiskLens</h2>
        <p style={{ color: 'var(--color-status-grey)', marginBottom: 'var(--spacing-md)' }}>Vendor Intelligence Suite</p>
        <div className="form-group" style={{ marginBottom: 'var(--spacing-lg)' }}>
          <label htmlFor="role-select">Select Your Role</label>
          <select
            id="role-select"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="" disabled>Choose a role...</option>
            {Object.keys(ROLES).map((roleKey) => (
              <option key={roleKey} value={roleKey}>
                {ROLES[roleKey].label}
              </option>
            ))}
          </select>
        </div>
        <button
          className="button button-primary w-full"
          onClick={handleLogin}
          disabled={!selectedRole}
        >
          Login
        </button>
      </div>
    </div>
  );
};

const Header = ({ currentUser, logout, navigate }) => {
  if (!currentUser) return null;
  return (
    <header className="header">
      <div className="header-logo" onClick={() => navigate('Dashboard')}>RiskLens</div>
      <div className="header-controls">
        <div className="global-search">
          <FaSearch />
          <input type="text" placeholder="Search everything..." />
        </div>
        <div className="user-info">
          <div className="user-avatar">{currentUser.initials}</div>
          <span>{currentUser.label}</span>
        </div>
        <button className="logout-button" onClick={logout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </header>
  );
};

// Card Components for Dashboard
const DashboardCard = ({ cardData, navigate, currentUser }) => {
  const getCardStatusClass = () => {
    if (cardData.status) {
      return getStatusClass(cardData.status);
    }
    // Fallback for KPI cards, use status of the KPI value if available
    if (cardData.kpi) {
      const kpi = currentUser.kpis[cardData.kpi];
      if (kpi && kpi.trend === 'down' || (kpi?.unit === 'vendors' && kpi.value > 0)) {
        return getStatusClass('High Risk');
      } else if (kpi && kpi.trend === 'up' && kpi.value > 0) {
        return getStatusClass('Approved');
      }
      return getStatusClass('In Progress');
    }
    return getStatusClass('info'); // Default
  };

  const handleClick = () => {
    if (cardData.navigateTo) {
      navigate(cardData.navigateTo, cardData.filter);
    }
  };

  const kpiValue = cardData.kpi ? currentUser.kpis[cardData.kpi]?.value : null;
  const kpiUnit = cardData.kpi ? currentUser.kpis[cardData.kpi]?.unit : null;

  return (
    <div className={`${getCardStatusClass()} ${cardData.kpi ? 'live-pulse' : ''}`} onClick={handleClick}>
      <div className="card-header" style={{ backgroundColor: kpiValue !== null ? 'var(--color-primary)' : '' }}>
        {cardData.icon && React.createElement(cardData.icon)}
        <span style={{ marginLeft: cardData.icon ? 'var(--spacing-xs)' : '0' }}>{cardData.title}</span>
        {kpiValue !== null && <div className={`status-badge ${kpiValue > 0 && kpiValue < 600 ? 'high-risk' : 'approved'}`}>{kpiValue} {kpiUnit}</div>}
      </div>
      <div className="card-body">
        {cardData.description && <p className="card-description">{cardData.description}</p>}
        {kpiValue !== null && (
          <div className="card-kpi">
            {kpiValue} <span className="card-kpi-unit">{kpiUnit}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const DashboardScreen = ({ currentUser, navigate }) => {
  if (!currentUser || !currentUser.dashboardCards) {
    return (
      <NoDataIllustration
        message="Your role does not have a dashboard configured or you do not have permission to view it."
        actionText="Contact Admin"
        onAction={() => alert('Please contact your administrator for access.')}
      />
    );
  }

  const kpiCards = currentUser.dashboardCards.filter(card => card.kpi);
  const navigationCards = currentUser.dashboardCards.filter(card => !card.kpi);

  return (
    <div className="screen-content">
      <h1 className="screen-header">Welcome, {currentUser.label}!</h1>

      <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Key Performance Indicators</h2>
      <div className="card-grid">
        {kpiCards.length > 0 ? (
          kpiCards.map(card => (
            <DashboardCard key={card.id} cardData={card} navigate={navigate} currentUser={currentUser} />
          ))
        ) : (
          <p style={{ color: 'var(--color-status-grey)' }}>No KPIs configured for your role.</p>
        )}
      </div>

      <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Modules & Actions</h2>
      <div className="card-grid">
        {navigationCards.length > 0 ? (
          navigationCards.map(card => (
            <DashboardCard key={card.id} cardData={card} navigate={navigate} currentUser={currentUser} />
          ))
        ) : (
          <NoDataIllustration message="No navigation cards configured for your role." />
        )}
      </div>
    </div>
  );
};

// --- GENERIC CARD COMPONENTS ---
const VendorCard = ({ vendor, navigate }) => (
  <div className={getStatusClass(vendor.status)} onClick={() => navigate('VendorDetail', vendor.id)}>
    <div className="card-header">{vendor.name}</div>
    <div className="card-body">
      <p className="card-meta">Type: {vendor.type}</p>
      <p className="card-meta">Contact: {vendor.contact}</p>
      <p className="card-meta">Risk Score: <span className={vendor.riskScore && vendor.riskScore < 500 ? 'status-text-red' : 'status-text-green'}>{vendor.riskScore || 'N/A'}</span></p>
      <p className="card-meta">Compliance: <span className={vendor.complianceStatus === 'Non-Compliant' ? 'status-text-red' : (vendor.complianceStatus === 'Compliant' ? 'status-text-green' : 'status-text-orange')}>{vendor.complianceStatus}</span></p>
    </div>
    <div className="card-footer">
      <span>Status: <span className={`status-badge ${getStatusClass(vendor.status).split(' ')[1]}`}>{vendor.status}</span></span>
      <span>Contract End: {vendor.contractEndDate || 'N/A'}</span>
    </div>
  </div>
);

const OnboardingRequestCard = ({ request, navigate }) => (
  <div className={getStatusClass(request.status)} onClick={() => navigate('OnboardingDetail', request.id)}>
    <div className="card-header">Onboarding: {request.vendorName}</div>
    <div className="card-body">
      <p className="card-meta">Initiator: {request.initiator}</p>
      <p className="card-meta">Current Stage: {request.currentStage}</p>
      <p className="card-meta">Last Updated: {new Date(request.workflowHistory?.[request.workflowHistory.length - 1]?.date).toLocaleDateString()}</p>
    </div>
    <div className="card-footer">
      <span>Status: <span className={`status-badge ${getStatusClass(request.status).split(' ')[1]}`}>{request.status}</span></span>
      <span>SLA: <span className={`status-badge ${getStatusClass(request.slaStatus).split(' ')[1]}`}>{request.slaStatus}</span></span>
    </div>
  </div>
);

const AuditReportCard = ({ report, navigate }) => (
  <div className={getStatusClass(report.status)} onClick={() => navigate('AuditDetail', report.id)}>
    <div className="card-header">{report.type} for {report.vendorName}</div>
    <div className="card-body">
      <p className="card-meta">Date: {report.date}</p>
      <p className="card-meta">Assigned To: {report.assignedTo}</p>
      <p className="card-meta">Findings: {report.findings ? report.findings.substring(0, 50) + '...' : 'N/A'}</p>
    </div>
    <div className="card-footer">
      <span>Status: <span className={`status-badge ${getStatusClass(report.status).split(' ')[1]}`}>{report.status}</span></span>
      <span>SLA: <span className={`status-badge ${getStatusClass(report.slaStatus).split(' ')[1]}`}>{report.slaStatus}</span></span>
    </div>
  </div>
);

const RiskAssessmentCard = ({ assessment, navigate }) => (
  <div className={getStatusClass(assessment.status)} onClick={() => navigate('RiskAssessmentDetail', assessment.id)}>
    <div className="card-header">{assessment.type} for {assessment.vendorName}</div>
    <div className="card-body">
      <p className="card-meta">Date: {assessment.date}</p>
      <p className="card-meta">Impact: {assessment.scoreImpact || 'N/A'}</p>
      <p className="card-meta">Description: {assessment.description.substring(0, 50)}...</p>
    </div>
    <div className="card-footer">
      <span>Status: <span className={`status-badge ${getStatusClass(assessment.status).split(' ')[1]}`}>{assessment.status}</span></span>
      <span>SLA: <span className={`status-badge ${getStatusClass(assessment.slaStatus).split(' ')[1]}`}>{assessment.slaStatus}</span></span>
    </div>
  </div>
);

// --- LIST SCREENS ---
const VendorListScreen = ({ navigate, currentUser, filter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const canCreate = currentUser.canCreate.includes('VendorForm');

  const filteredVendors = DUMMY_DATA.vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter ? vendor.status === filter : true;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="screen-content">
      <div className="screen-header">
        <h1>Vendor List {filter && <span style={{ color: 'var(--color-status-grey)', fontSize: 'var(--font-size-lg)' }}> ({filter})</span>}</h1>
        <div className="flex-row gap-md">
          <div className="global-search">
            <FaSearch />
            <input
              type="text"
              placeholder="Search vendors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {canCreate && (
            <button className="button button-primary" onClick={() => navigate('VendorForm')}>
              <FaPlus /> New Vendor
            </button>
          )}
        </div>
      </div>

      {filteredVendors.length === 0 ? (
        <NoDataIllustration
          message="No vendors match your criteria."
          actionText={canCreate ? "Create New Vendor" : null}
          onAction={canCreate ? () => navigate('VendorForm') : null}
        />
      ) : (
        <div className="card-grid">
          {filteredVendors.map(vendor => (
            <VendorCard key={vendor.id} vendor={vendor} navigate={navigate} />
          ))}
        </div>
      )}
    </div>
  );
};

const OnboardingListScreen = ({ navigate, currentUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const canCreate = currentUser.canCreate.includes('OnboardingForm');

  const filteredRequests = DUMMY_DATA.onboardingRequests.filter(req =>
    req.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.currentStage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="screen-content">
      <div className="screen-header">
        <h1>Onboarding Requests</h1>
        <div className="flex-row gap-md">
          <div className="global-search">
            <FaSearch />
            <input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {canCreate && (
            <button className="button button-primary" onClick={() => navigate('OnboardingForm')}>
              <FaPlus /> New Request
            </button>
          )}
        </div>
      </div>

      {filteredRequests.length === 0 ? (
        <NoDataIllustration
          message="No onboarding requests found."
          actionText={canCreate ? "Initiate New Onboarding" : null}
          onAction={canCreate ? () => navigate('OnboardingForm') : null}
        />
      ) : (
        <div className="card-grid">
          {filteredRequests.map(req => (
            <OnboardingRequestCard key={req.id} request={req} navigate={navigate} />
          ))}
        </div>
      )}
    </div>
  );
};

const AuditListScreen = ({ navigate, currentUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const canCreate = currentUser.canCreate.includes('AuditForm');

  const filteredAudits = DUMMY_DATA.auditReports.filter(audit =>
    audit.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    audit.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    audit.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="screen-content">
      <div className="screen-header">
        <h1>Audit Reports</h1>
        <div className="flex-row gap-md">
          <div className="global-search">
            <FaSearch />
            <input
              type="text"
              placeholder="Search audits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {canCreate && (
            <button className="button button-primary" onClick={() => navigate('AuditForm')}>
              <FaPlus /> New Audit
            </button>
          )}
        </div>
      </div>

      {filteredAudits.length === 0 ? (
        <NoDataIllustration
          message="No audit reports found."
          actionText={canCreate ? "Schedule New Audit" : null}
          onAction={canCreate ? () => navigate('AuditForm') : null}
        />
      ) : (
        <div className="card-grid">
          {filteredAudits.map(audit => (
            <AuditReportCard key={audit.id} report={audit} navigate={navigate} />
          ))}
        </div>
      )}
    </div>
  );
};

const RiskAssessmentListScreen = ({ navigate, currentUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const canCreate = currentUser.canCreate.includes('RiskAssessmentForm');

  const filteredAssessments = DUMMY_DATA.riskAssessments.filter(ra =>
    ra.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ra.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ra.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="screen-content">
      <div className="screen-header">
        <h1>Risk Assessments</h1>
        <div className="flex-row gap-md">
          <div className="global-search">
            <FaSearch />
            <input
              type="text"
              placeholder="Search assessments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {canCreate && (
            <button className="button button-primary" onClick={() => navigate('RiskAssessmentForm')}>
              <FaPlus /> New Assessment
            </button>
          )}
        </div>
      </div>

      {filteredAssessments.length === 0 ? (
        <NoDataIllustration
          message="No risk assessments found."
          actionText={canCreate ? "Initiate New Risk Assessment" : null}
          onAction={canCreate ? () => navigate('RiskAssessmentForm') : null}
        />
      ) : (
        <div className="card-grid">
          {filteredAssessments.map(assessment => (
            <RiskAssessmentCard key={assessment.id} assessment={assessment} navigate={navigate} />
          ))}
        </div>
      )}
    </div>
  );
};


const ActivityLogScreen = ({ navigate, currentUser }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = DUMMY_DATA.activityLogs
    .filter(log =>
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entityType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Most recent first

  return (
    <div className="screen-content">
      <div className="screen-header">
        <h1>Activity Logs</h1>
        <div className="global-search">
          <FaSearch />
          <input
            type="text"
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredLogs.length === 0 ? (
        <NoDataIllustration message="No activity logs found." />
      ) : (
        <div className="data-grid-container">
          <table className="data-grid">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>User</th>
                <th>Action</th>
                <th>Entity</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map(log => (
                <tr key={log.id}>
                  <td>{new Date(log.timestamp).toLocaleString()}</td>
                  <td>{log.user}</td>
                  <td>{log.action}</td>
                  <td>
                    {log.entityType}: {log.entityId}
                    {log.entityType === 'Vendor' && currentUser.canView.includes('VendorDetail') && (
                      <button className="button-text" onClick={() => navigate('VendorDetail', log.entityId)}>View</button>
                    )}
                  </td>
                  <td>{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};


// --- DETAIL SCREENS ---
const VendorDetailScreen = ({ vendorId, navigate, currentUser, addToast }) => {
  const vendor = DUMMY_DATA.vendors.find(v => v.id === vendorId);
  if (!vendor) return <NoDataIllustration message="Vendor not found." />;

  const canEdit = currentUser.canEdit.includes('VendorForm');
  const canInitiateRiskAssessment = currentUser.canCreate.includes('RiskAssessmentForm');

  const handleEdit = () => navigate('VendorForm', vendor.id);
  const handleInitiateRisk = () => navigate('RiskAssessmentForm', { vendorId: vendor.id, vendorName: vendor.name });

  const breadcrumbPath = [
    { name: 'Dashboard', screen: 'Dashboard' },
    { name: 'Vendors', screen: 'VendorList' },
    { name: vendor.name, screen: 'VendorDetail', id: vendor.id }
  ];

  return (
    <div className="screen-content">
      <Breadcrumb path={breadcrumbPath} navigate={navigate} />
      <div className="screen-header">
        <h1>{vendor.name} <span className={`status-badge ${getStatusClass(vendor.status).split(' ')[1]}`}>{vendor.status}</span></h1>
        <div className="flex-row gap-md">
          {canInitiateRiskAssessment && (
            <button className="button button-secondary" onClick={handleInitiateRisk}>
              <MdOutlineAssessment /> Initiate Risk Assessment
            </button>
          )}
          {canEdit && (
            <button className="button button-primary" onClick={handleEdit}>
              <FaEdit /> Edit Vendor
            </button>
          )}
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-column">
          <div className="detail-section">
            <h3>General Information</h3>
            <DetailItem label="Type" value={vendor.type} />
            <DetailItem label="Contact" value={vendor.contact} />
            <DetailItem label="Annual Revenue" value={vendor.annualRevenue} />
            <DetailItem label="Employee Count" value={vendor.employeeCount} />
            <DetailItem label="Contract End Date" value={vendor.contractEndDate} />
          </div>
          <div className="detail-section">
            <h3>Risk Profile</h3>
            <DetailItem label="Risk Score" value={<span className={vendor.riskScore && vendor.riskScore < 500 ? 'status-text-red' : 'status-text-green'}>{vendor.riskScore || 'N/A'}</span>} />
            <DetailItem label="Overall Status" value={<span className={`status-badge ${getStatusClass(vendor.status).split(' ')[1]}`}>{vendor.status}</span>} />
            <DetailItem label="Related Risks" value={
              vendor.relatedRisks && vendor.relatedRisks.length > 0
                ? vendor.relatedRisks.map(riskId => {
                    const risk = DUMMY_DATA.riskAssessments.find(r => r.id === riskId);
                    return risk ? (
                      <span key={riskId} style={{ marginRight: 'var(--spacing-xs)' }}>
                        <a onClick={() => navigate('RiskAssessmentDetail', risk.id)}>{risk.type}</a>
                      </span>
                    ) : null;
                  })
                : 'None'
            } />
          </div>
        </div>
        <div className="detail-column">
          <div className="detail-section">
            <h3>Compliance & Audits</h3>
            <DetailItem label="Compliance Status" value={<span className={`status-badge ${getStatusClass(vendor.complianceStatus).split(' ')[1]}`}>{vendor.complianceStatus}</span>} />
            <DetailItem label="Last Audit" value={vendor.lastAuditDate} />
            <DetailItem label="Next Audit" value={vendor.nextAuditDate} />
            <DetailItem label="Related Audits" value={
              DUMMY_DATA.auditReports.filter(ar => ar.vendorId === vendor.id).map(audit => (
                <span key={audit.id} style={{ marginRight: 'var(--spacing-xs)' }}>
                  <a onClick={() => navigate('AuditDetail', audit.id)}>{audit.type}</a>
                </span>
              ))
            } />
          </div>
          <div className="detail-section">
            <h3>Documents</h3>
            {vendor.documents && vendor.documents.length > 0 ? (
              vendor.documents.map((doc, index) => (
                <div key={index} className="flex-row align-center gap-sm mb-sm">
                  <FaFileAlt />
                  <a href={doc.url} target="_blank" rel="noopener noreferrer">{doc.name}</a>
                </div>
              ))
            ) : (
              <p style={{ color: 'var(--color-status-grey)' }}>No documents uploaded.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const OnboardingDetailScreen = ({ requestId, navigate, currentUser, addToast }) => {
  const request = DUMMY_DATA.onboardingRequests.find(req => req.id === requestId);
  if (!request) return <NoDataIllustration message="Onboarding request not found." />;

  const canApprove = currentUser.canApprove.includes('OnboardingApprovalForm');
  const currentStage = request.workflowHistory?.[request.workflowHistory.length - 1]?.stage;
  const isPendingProcurementReview = currentStage === 'Procurement Review' && currentUser.role === 'procurement_manager';
  const isPendingComplianceReview = currentStage === 'Compliance Review' && currentUser.role === 'compliance_officer';

  const handleApprove = () => {
    // In a real app, this would update backend, here we just simulate
    addToast({ message: `Onboarding Request ${request.id} Approved!`, type: 'success' });
    navigate('OnboardingList');
  };

  const handleReject = () => {
    addToast({ message: `Onboarding Request ${request.id} Rejected.`, type: 'error' });
    navigate('OnboardingList');
  };

  const breadcrumbPath = [
    { name: 'Dashboard', screen: 'Dashboard' },
    { name: 'Onboarding Requests', screen: 'OnboardingList' },
    { name: `Request ${request.id}`, screen: 'OnboardingDetail', id: request.id }
  ];

  return (
    <div className="screen-content">
      <Breadcrumb path={breadcrumbPath} navigate={navigate} />
      <div className="screen-header">
        <h1>Onboarding Request for {request.vendorName}</h1>
        <span className={`status-badge ${getStatusClass(request.status).split(' ')[1]}`}>{request.status}</span>
      </div>

      <div className="detail-grid">
        <div className="detail-column">
          <div className="detail-section">
            <h3>Request Details</h3>
            <DetailItem label="Request ID" value={request.id} />
            <DetailItem label="Vendor Name" value={<a onClick={() => navigate('VendorDetail', request.vendorId)}>{request.vendorName}</a>} />
            <DetailItem label="Initiator" value={request.initiator} />
            <DetailItem label="Current Stage" value={request.currentStage} />
            <DetailItem label="SLA Status" value={<span className={`status-badge ${getStatusClass(request.slaStatus).split(' ')[1]}`}>{request.slaStatus}</span>} />
            {request.status === 'Rejected' && <DetailItem label="Reason" value={request.workflowHistory?.find(h => h.stage === 'Rejected')?.reason} />}
          </div>
        </div>
        <div className="detail-column">
          <WorkflowTracker workflowHistory={request.workflowHistory} slaStatus={request.slaStatus} />
          {(isPendingProcurementReview || isPendingComplianceReview) && canApprove && (
            <div className="form-actions" style={{ marginTop: 'var(--spacing-lg)', justifyContent: 'flex-start' }}>
              <button className="button button-primary" onClick={handleApprove}>
                <FaCheckCircle /> Approve
              </button>
              <button className="button button-danger" onClick={handleReject}>
                <FaTimesCircle /> Reject
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AuditDetailScreen = ({ auditId, navigate, currentUser, addToast }) => {
  const audit = DUMMY_DATA.auditReports.find(a => a.id === auditId);
  if (!audit) return <NoDataIllustration message="Audit report not found." />;

  const canEdit = currentUser.canEdit.includes('AuditForm');
  const canApprove = currentUser.canApprove.includes('AuditApprovalForm') && audit.status === 'Pending Review';

  const handleUpdate = () => navigate('AuditForm', audit.id);
  const handleApprove = () => {
    addToast({ message: `Audit ${audit.id} Approved/Completed!`, type: 'success' });
    navigate('AuditList');
  };

  const breadcrumbPath = [
    { name: 'Dashboard', screen: 'Dashboard' },
    { name: 'Audit Reports', screen: 'AuditList' },
    { name: `${audit.type} for ${audit.vendorName}`, screen: 'AuditDetail', id: audit.id }
  ];

  return (
    <div className="screen-content">
      <Breadcrumb path={breadcrumbPath} navigate={navigate} />
      <div className="screen-header">
        <h1>{audit.type} for {audit.vendorName}</h1>
        <div className="flex-row gap-md">
          <span className={`status-badge ${getStatusClass(audit.status).split(' ')[1]}`}>{audit.status}</span>
          {canEdit && <button className="button button-secondary" onClick={handleUpdate}><FaEdit /> Update Audit</button>}
          {canApprove && <button className="button button-primary" onClick={handleApprove}><FaCheckCircle /> Mark Completed</button>}
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-column">
          <div className="detail-section">
            <h3>Audit Information</h3>
            <DetailItem label="Audit ID" value={audit.id} />
            <DetailItem label="Vendor Name" value={<a onClick={() => navigate('VendorDetail', audit.vendorId)}>{audit.vendorName}</a>} />
            <DetailItem label="Audit Type" value={audit.type} />
            <DetailItem label="Date" value={audit.date} />
            <DetailItem label="Assigned To" value={audit.assignedTo} />
            <DetailItem label="SLA Status" value={<span className={`status-badge ${getStatusClass(audit.slaStatus).split(' ')[1]}`}>{audit.slaStatus}</span>} />
          </div>
          <div className="detail-section">
            <h3>Findings & Recommendations</h3>
            <p style={{ color: 'var(--color-text-light)' }}>{audit.findings || 'No findings recorded yet.'}</p>
          </div>
        </div>
        <div className="detail-column">
          <WorkflowTracker workflowHistory={audit.workflowHistory} slaStatus={audit.slaStatus} />
        </div>
      </div>
    </div>
  );
};

const RiskAssessmentDetailScreen = ({ assessmentId, navigate, currentUser, addToast }) => {
  const assessment = DUMMY_DATA.riskAssessments.find(a => a.id === assessmentId);
  if (!assessment) return <NoDataIllustration message="Risk assessment not found." />;

  const canEdit = currentUser.canEdit.includes('RiskAssessmentForm');
  const canApprove = currentUser.canApprove.includes('RiskModelApprovalForm') && assessment.status === 'Submitted';

  const handleEdit = () => navigate('RiskAssessmentForm', assessment.id);
  const handleApprove = () => {
    addToast({ message: `Risk Assessment ${assessment.id} Approved!`, type: 'success' });
    navigate('RiskAssessmentList');
  };

  const breadcrumbPath = [
    { name: 'Dashboard', screen: 'Dashboard' },
    { name: 'Risk Assessments', screen: 'RiskAssessmentList' },
    { name: `${assessment.type} for ${assessment.vendorName}`, screen: 'RiskAssessmentDetail', id: assessment.id }
  ];

  return (
    <div className="screen-content">
      <Breadcrumb path={breadcrumbPath} navigate={navigate} />
      <div className="screen-header">
        <h1>{assessment.type} for {assessment.vendorName}</h1>
        <div className="flex-row gap-md">
          <span className={`status-badge ${getStatusClass(assessment.status).split(' ')[1]}`}>{assessment.status}</span>
          {canEdit && <button className="button button-secondary" onClick={handleEdit}><FaEdit /> Edit Assessment</button>}
          {canApprove && <button className="button button-primary" onClick={handleApprove}><FaCheckCircle /> Approve Assessment</button>}
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-column">
          <div className="detail-section">
            <h3>Assessment Details</h3>
            <DetailItem label="Assessment ID" value={assessment.id} />
            <DetailItem label="Vendor Name" value={<a onClick={() => navigate('VendorDetail', assessment.vendorId)}>{assessment.vendorName}</a>} />
            <DetailItem label="Risk Type" value={assessment.type} />
            <DetailItem label="Date" value={assessment.date} />
            <DetailItem label="Score Impact" value={<span className={assessment.scoreImpact < 0 ? 'status-text-red' : 'status-text-green'}>{assessment.scoreImpact || 'N/A'}</span>} />
            <DetailItem label="Assigned To" value={assessment.assignedTo} />
            <DetailItem label="SLA Status" value={<span className={`status-badge ${getStatusClass(assessment.slaStatus).split(' ')[1]}`}>{assessment.slaStatus}</span>} />
          </div>
          <div className="detail-section">
            <h3>Description & Recommendations</h3>
            <p style={{ color: 'var(--color-text-light)' }}>{assessment.description}</p>
            <h4 style={{ color: 'var(--color-secondary)' }}>Recommendations:</h4>
            <p style={{ color: 'var(--color-text-light)' }}>{assessment.recommendations}</p>
          </div>
        </div>
        <div className="detail-column">
          <WorkflowTracker workflowHistory={assessment.workflowHistory} slaStatus={assessment.slaStatus} />
        </div>
      </div>
    </div>
  );
};


// --- FORM SCREENS ---
const VendorFormScreen = ({ vendorId, navigate, currentUser, addToast }) => {
  const isEditing = !!vendorId;
  const existingVendor = isEditing ? DUMMY_DATA.vendors.find(v => v.id === vendorId) : null;

  const [formData, setFormData] = useState({
    name: existingVendor?.name || '',
    type: existingVendor?.type || '',
    contact: existingVendor?.contact || '',
    annualRevenue: existingVendor?.annualRevenue || '',
    employeeCount: existingVendor?.employeeCount || '',
    contractEndDate: existingVendor?.contractEndDate || '',
    status: existingVendor?.status || 'Draft',
    complianceStatus: existingVendor?.complianceStatus || 'Draft',
    riskScore: existingVendor?.riskScore || '',
    file: null, // For file upload example
  });
  const [errors, setErrors] = useState({});

  const canEditFields = currentUser.canEdit.includes('VendorForm');
  const canCreate = currentUser.canCreate.includes('VendorForm');

  useEffect(() => {
    if (isEditing && !existingVendor) {
      addToast({ message: "Vendor not found for editing.", type: 'error' });
      navigate('VendorList');
    }
  }, [isEditing, existingVendor, addToast, navigate]);

  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = 'Vendor Name is required.';
    if (!formData.type) newErrors.type = 'Vendor Type is required.';
    if (!formData.contact) newErrors.contact = 'Contact Email is required.';
    else if (!/\S+@\S+\.\S+/.test(formData.contact)) newErrors.contact = 'Invalid email format.';
    if (formData.annualRevenue && isNaN(parseFloat(formData.annualRevenue))) newErrors.annualRevenue = 'Annual Revenue must be a number.';
    if (formData.employeeCount && isNaN(parseInt(formData.employeeCount))) newErrors.employeeCount = 'Employee Count must be an integer.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canCreate && !canEditFields) {
      addToast({ message: "You don't have permission to perform this action.", type: 'error' });
      return;
    }
    if (validate()) {
      const newRecord = {
        ...existingVendor,
        ...formData,
        id: isEditing ? existingVendor.id : `V${String(DUMMY_DATA.vendors.length + 1).padStart(3, '0')}`,
        riskScore: formData.riskScore ? parseInt(formData.riskScore) : null,
        annualRevenue: formData.annualRevenue ? `${parseFloat(formData.annualRevenue).toLocaleString()}M` : '', // Format dummy data
        employeeCount: formData.employeeCount ? parseInt(formData.employeeCount) : null,
        lastAuditDate: existingVendor?.lastAuditDate || (formData.status === 'Active' ? '2024-01-01' : null),
        nextAuditDate: existingVendor?.nextAuditDate || (formData.status === 'Active' ? '2025-01-01' : null),
        documents: existingVendor?.documents || [],
        relatedRisks: existingVendor?.relatedRisks || [],
        onboardingStatus: existingVendor?.onboardingStatus || 'Approved', // Assume directly approved if created via form
      };

      if (formData.file) {
        newRecord.documents.push({ name: formData.file.name, url: '#' }); // Simulate upload
      }

      if (isEditing) {
        DUMMY_DATA.vendors = DUMMY_DATA.vendors.map(v => v.id === newRecord.id ? newRecord : v);
        addToast({ message: `Vendor ${newRecord.name} updated successfully!`, type: 'success' });
      } else {
        DUMMY_DATA.vendors.push(newRecord);
        addToast({ message: `Vendor ${newRecord.name} created successfully!`, type: 'success' });
      }
      navigate('VendorList');
    } else {
      addToast({ message: 'Please correct the form errors.', type: 'error' });
    }
  };

  const breadcrumbPath = [
    { name: 'Dashboard', screen: 'Dashboard' },
    { name: 'Vendors', screen: 'VendorList' },
    { name: isEditing ? `Edit ${existingVendor.name}` : 'New Vendor' }
  ];

  return (
    <div className="screen-content">
      <Breadcrumb path={breadcrumbPath} navigate={navigate} />
      <div className="screen-header">
        <h1>{isEditing ? `Edit Vendor: ${existingVendor?.name}` : 'Create New Vendor'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="name">Vendor Name <span className="error-message">*</span></label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} disabled={!canEditFields && isEditing} />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="type">Vendor Type <span className="error-message">*</span></label>
          <input type="text" id="type" name="type" value={formData.type} onChange={handleChange} disabled={!canEditFields && isEditing} />
          {errors.type && <span className="error-message">{errors.type}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="contact">Contact Email <span className="error-message">*</span></label>
          <input type="email" id="contact" name="contact" value={formData.contact} onChange={handleChange} disabled={!canEditFields && isEditing} />
          {errors.contact && <span className="error-message">{errors.contact}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="annualRevenue">Annual Revenue (in Millions)</label>
          <input type="text" id="annualRevenue" name="annualRevenue" value={formData.annualRevenue} onChange={handleChange} disabled={!canEditFields && isEditing} />
          {errors.annualRevenue && <span className="error-message">{errors.annualRevenue}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="employeeCount">Employee Count</label>
          <input type="number" id="employeeCount" name="employeeCount" value={formData.employeeCount} onChange={handleChange} disabled={!canEditFields && isEditing} />
          {errors.employeeCount && <span className="error-message">{errors.employeeCount}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="contractEndDate">Contract End Date</label>
          <input type="date" id="contractEndDate" name="contractEndDate" value={formData.contractEndDate} onChange={handleChange} disabled={!canEditFields && isEditing} />
          {errors.contractEndDate && <span className="error-message">{errors.contractEndDate}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="riskScore">Risk Score (e.g., 300-900)</label>
          <input type="number" id="riskScore" name="riskScore" value={formData.riskScore} onChange={handleChange} disabled={!canEditFields && isEditing} />
          {errors.riskScore && <span className="error-message">{errors.riskScore}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="status">Overall Status</label>
          <select id="status" name="status" value={formData.status} onChange={handleChange} disabled={!canEditFields && isEditing}>
            <option value="Draft">Draft</option>
            <option value="Active">Active</option>
            <option value="Onboarding">Onboarding</option>
            <option value="High Risk">High Risk</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="complianceStatus">Compliance Status</label>
          <select id="complianceStatus" name="complianceStatus" value={formData.complianceStatus} onChange={handleChange} disabled={!canEditFields && isEditing}>
            <option value="Draft">Draft</option>
            <option value="Compliant">Compliant</option>
            <option value="Pending Review">Pending Review</option>
            <option value="Non-Compliant">Non-Compliant</option>
          </select>
        </div>
        {canEditFields && ( // Only allow file upload if user can edit
          <div className="form-group">
            <label htmlFor="file-upload">Upload Document</label>
            <div className="file-upload-wrapper">
              <input type="file" id="file-upload" name="file" onChange={handleChange} />
              <label htmlFor="file-upload">Choose File</label>
              <span className="file-upload-filename">{formData.file ? formData.file.name : 'No file chosen'}</span>
            </div>
          </div>
        )}
        <div className="form-actions">
          <button type="button" className="button button-secondary" onClick={() => navigate('VendorList')}>Cancel</button>
          <button type="submit" className="button button-primary" disabled={(!canCreate && !isEditing) || (isEditing && !canEditFields)}>
            {isEditing ? 'Save Changes' : 'Create Vendor'}
          </button>
        </div>
      </form>
    </div>
  );
};

const OnboardingFormScreen = ({ recordData, navigate, currentUser, addToast }) => {
  const isEditing = !!recordData; // recordData can be an ID or an object like { vendorId, vendorName }
  const existingRequest = isEditing ? DUMMY_DATA.onboardingRequests.find(req => req.id === recordData) : null;
  const initialVendor = recordData && typeof recordData === 'object' ? recordData : null;

  const [formData, setFormData] = useState({
    vendorName: existingRequest?.vendorName || initialVendor?.vendorName || '',
    vendorId: existingRequest?.vendorId || initialVendor?.vendorId || '',
    type: existingRequest?.form?.type || '',
    contact: existingRequest?.form?.contact || '',
    priority: 'Normal',
    comments: '',
  });
  const [errors, setErrors] = useState({});

  const canCreate = currentUser.canCreate.includes('OnboardingForm');
  // Assume basic fields can be edited by the initiator if in draft, but not the core details once submitted
  const canEdit = currentUser.canEdit.includes('OnboardingForm') && existingRequest?.status === 'Draft';

  const validate = () => {
    let newErrors = {};
    if (!formData.vendorName) newErrors.vendorName = 'Vendor Name is required.';
    if (!formData.type) newErrors.type = 'Vendor Type is required.';
    if (!formData.contact) newErrors.contact = 'Contact Email is required.';
    else if (!/\S+@\S+\.\S+/.test(formData.contact)) newErrors.contact = 'Invalid email format.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canCreate && !canEdit) {
      addToast({ message: "You don't have permission to perform this action.", type: 'error' });
      return;
    }
    if (validate()) {
      const newId = `ONB${String(DUMMY_DATA.onboardingRequests.length + 1).padStart(3, '0')}`;
      const newRequest = {
        id: existingRequest?.id || newId,
        vendorId: formData.vendorId || `V_TEMP_${newId}`, // Simulate creation or link to existing
        vendorName: formData.vendorName,
        status: existingRequest?.status || 'Submitted',
        initiator: currentUser.label,
        currentStage: existingRequest?.currentStage || 'Procurement Review',
        slaStatus: existingRequest?.slaStatus || 'On Track',
        workflowHistory: existingRequest?.workflowHistory || [{ stage: 'Draft', date: new Date().toISOString() }, { stage: 'Submitted', date: new Date().toISOString() }],
        form: { ...formData }, // Store form data for detail view
      };

      if (isEditing) {
        DUMMY_DATA.onboardingRequests = DUMMY_DATA.onboardingRequests.map(req => req.id === newRequest.id ? newRequest : req);
        addToast({ message: `Onboarding Request ${newRequest.id} updated successfully!`, type: 'success' });
      } else {
        DUMMY_DATA.onboardingRequests.push(newRequest);
        addToast({ message: `Onboarding Request for ${newRequest.vendorName} submitted!`, type: 'success' });
      }
      navigate('OnboardingList');
    } else {
      addToast({ message: 'Please correct the form errors.', type: 'error' });
    }
  };

  const breadcrumbPath = [
    { name: 'Dashboard', screen: 'Dashboard' },
    { name: 'Onboarding Requests', screen: 'OnboardingList' },
    { name: isEditing ? `Edit Request ${existingRequest?.id}` : 'New Onboarding Request' }
  ];

  return (
    <div className="screen-content">
      <Breadcrumb path={breadcrumbPath} navigate={navigate} />
      <div className="screen-header">
        <h1>{isEditing ? `Edit Onboarding Request: ${existingRequest?.vendorName}` : 'New Onboarding Request'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="vendorName">Vendor Name <span className="error-message">*</span></label>
          <input type="text" id="vendorName" name="vendorName" value={formData.vendorName} onChange={handleChange} disabled={!canCreate && !canEdit} />
          {errors.vendorName && <span className="error-message">{errors.vendorName}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="type">Vendor Type <span className="error-message">*</span></label>
          <input type="text" id="type" name="type" value={formData.type} onChange={handleChange} disabled={!canCreate && !canEdit} />
          {errors.type && <span className="error-message">{errors.type}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="contact">Contact Email <span className="error-message">*</span></label>
          <input type="email" id="contact" name="contact" value={formData.contact} onChange={handleChange} disabled={!canCreate && !canEdit} />
          {errors.contact && <span className="error-message">{errors.contact}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select id="priority" name="priority" value={formData.priority} onChange={handleChange} disabled={!canCreate && !canEdit}>
            <option value="Normal">Normal</option>
            <option value="High">High</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="comments">Additional Comments</label>
          <textarea id="comments" name="comments" value={formData.comments} onChange={handleChange} disabled={!canCreate && !canEdit} />
        </div>
        <div className="form-actions">
          <button type="button" className="button button-secondary" onClick={() => navigate('OnboardingList')}>Cancel</button>
          <button type="submit" className="button button-primary" disabled={!canCreate && !canEdit}>
            {isEditing ? 'Save Changes' : 'Submit Request'}
          </button>
        </div>
      </form>
    </div>
  );
};

const AuditFormScreen = ({ auditId, navigate, currentUser, addToast }) => {
  const isEditing = !!auditId;
  const existingAudit = isEditing ? DUMMY_DATA.auditReports.find(a => a.id === auditId) : null;

  const [formData, setFormData] = useState({
    vendorId: existingAudit?.vendorId || '',
    type: existingAudit?.auditForm?.type || '',
    date: existingAudit?.date || new Date().toISOString().substring(0, 10),
    description: existingAudit?.auditForm?.description || '',
    findings: existingAudit?.findings || '',
    status: existingAudit?.status || 'Scheduled',
    file: null,
  });
  const [errors, setErrors] = useState({});

  const canCreate = currentUser.canCreate.includes('AuditForm');
  const canEdit = currentUser.canEdit.includes('AuditForm') && existingAudit?.status !== 'Completed';

  useEffect(() => {
    if (isEditing && !existingAudit) {
      addToast({ message: "Audit not found for editing.", type: 'error' });
      navigate('AuditList');
    }
  }, [isEditing, existingAudit, addToast, navigate]);

  const validate = () => {
    let newErrors = {};
    if (!formData.vendorId) newErrors.vendorId = 'Vendor is required.';
    if (!formData.type) newErrors.type = 'Audit Type is required.';
    if (!formData.date) newErrors.date = 'Date is required.';
    if (formData.status === 'Completed' && !formData.findings) newErrors.findings = 'Findings are required for completed audits.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canCreate && !canEdit) {
      addToast({ message: "You don't have permission to perform this action.", type: 'error' });
      return;
    }
    if (validate()) {
      const newId = `AUD${String(DUMMY_DATA.auditReports.length + 1).padStart(3, '0')}`;
      const newAudit = {
        id: existingAudit?.id || newId,
        vendorId: formData.vendorId,
        vendorName: DUMMY_DATA.vendors.find(v => v.id === formData.vendorId)?.name || 'Unknown Vendor',
        type: formData.type,
        date: formData.date,
        findings: formData.findings,
        assignedTo: currentUser.label,
        status: formData.status,
        slaStatus: formData.status === 'Completed' ? 'Completed' : (formData.status === 'Scheduled' ? 'On Track' : 'In Progress'),
        workflowHistory: existingAudit?.workflowHistory || [{ stage: 'Scheduled', date: new Date().toISOString() }],
        auditForm: { type: formData.type, description: formData.description },
      };

      if (formData.status === 'In Progress' && !newAudit.workflowHistory.some(h => h.stage === 'In Progress')) {
        newAudit.workflowHistory.push({ stage: 'In Progress', date: new Date().toISOString() });
      } else if (formData.status === 'Completed' && !newAudit.workflowHistory.some(h => h.stage === 'Completed')) {
        newAudit.workflowHistory.push({ stage: 'Review', date: new Date().toISOString() }); // Add review before completed
        newAudit.workflowHistory.push({ stage: 'Completed', date: new Date().toISOString() });
      }

      if (isEditing) {
        DUMMY_DATA.auditReports = DUMMY_DATA.auditReports.map(a => a.id === newAudit.id ? newAudit : a);
        addToast({ message: `Audit ${newAudit.id} updated successfully!`, type: 'success' });
      } else {
        DUMMY_DATA.auditReports.push(newAudit);
        addToast({ message: `New Audit for ${newAudit.vendorName} scheduled!`, type: 'success' });
      }
      navigate('AuditList');
    } else {
      addToast({ message: 'Please correct the form errors.', type: 'error' });
    }
  };

  const breadcrumbPath = [
    { name: 'Dashboard', screen: 'Dashboard' },
    { name: 'Audit Reports', screen: 'AuditList' },
    { name: isEditing ? `Edit Audit ${existingAudit?.id}` : 'New Audit Report' }
  ];

  return (
    <div className="screen-content">
      <Breadcrumb path={breadcrumbPath} navigate={navigate} />
      <div className="screen-header">
        <h1>{isEditing ? `Edit Audit Report: ${existingAudit?.vendorName}` : 'Schedule New Audit'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="vendorId">Vendor <span className="error-message">*</span></label>
          <select id="vendorId" name="vendorId" value={formData.vendorId} onChange={handleChange} disabled={isEditing && !canEdit}>
            <option value="" disabled>Select a vendor...</option>
            {DUMMY_DATA.vendors.map(vendor => (
              <option key={vendor.id} value={vendor.id}>{vendor.name}</option>
            ))}
          </select>
          {errors.vendorId && <span className="error-message">{errors.vendorId}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="type">Audit Type <span className="error-message">*</span></label>
          <input type="text" id="type" name="type" value={formData.type} onChange={handleChange} disabled={!canEdit && isEditing} />
          {errors.type && <span className="error-message">{errors.type}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="date">Audit Date <span className="error-message">*</span></label>
          <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} disabled={!canEdit && isEditing} />
          {errors.date && <span className="error-message">{errors.date}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} disabled={!canEdit && isEditing} />
        </div>
        <div className="form-group">
          <label htmlFor="findings">Findings</label>
          <textarea id="findings" name="findings" value={formData.findings} onChange={handleChange} disabled={!canEdit && isEditing} />
          {errors.findings && <span className="error-message">{errors.findings}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={formData.status} onChange={handleChange} disabled={!canEdit && isEditing}>
            <option value="Scheduled">Scheduled</option>
            <option value="In Progress">In Progress</option>
            <option value="Pending Review">Pending Review</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        {canEdit && (
          <div className="form-group">
            <label htmlFor="file-upload">Upload Audit Report Document</label>
            <div className="file-upload-wrapper">
              <input type="file" id="file-upload" name="file" onChange={handleChange} />
              <label htmlFor="file-upload">Choose File</label>
              <span className="file-upload-filename">{formData.file ? formData.file.name : 'No file chosen'}</span>
            </div>
          </div>
        )}
        <div className="form-actions">
          <button type="button" className="button button-secondary" onClick={() => navigate('AuditList')}>Cancel</button>
          <button type="submit" className="button button-primary" disabled={!canCreate && !canEdit}>
            {isEditing ? 'Save Changes' : 'Schedule Audit'}
          </button>
        </div>
      </form>
    </div>
  );
};

const RiskAssessmentFormScreen = ({ recordData, navigate, currentUser, addToast }) => {
  const isEditing = !!(typeof recordData === 'string' || typeof recordData === 'number');
  const existingAssessment = isEditing ? DUMMY_DATA.riskAssessments.find(ra => ra.id === recordData) : null;
  const initialVendor = recordData && typeof recordData === 'object' ? recordData : null;

  const [formData, setFormData] = useState({
    vendorId: existingAssessment?.vendorId || initialVendor?.vendorId || '',
    type: existingAssessment?.riskForm?.type || '',
    date: existingAssessment?.date || new Date().toISOString().substring(0, 10),
    impact: existingAssessment?.riskForm?.impact || 'Medium',
    scoreImpact: existingAssessment?.scoreImpact || '',
    description: existingAssessment?.description || '',
    recommendations: existingAssessment?.recommendations || '',
    mitigatingActions: existingAssessment?.riskForm?.mitigatingActions || '',
    status: existingAssessment?.status || 'Initiated',
    file: null,
  });
  const [errors, setErrors] = useState({});

  const canCreate = currentUser.canCreate.includes('RiskAssessmentForm');
  const canEdit = currentUser.canEdit.includes('RiskAssessmentForm') && existingAssessment?.status !== 'Approved';

  useEffect(() => {
    if (isEditing && !existingAssessment) {
      addToast({ message: "Risk Assessment not found for editing.", type: 'error' });
      navigate('RiskAssessmentList');
    }
  }, [isEditing, existingAssessment, addToast, navigate]);

  const validate = () => {
    let newErrors = {};
    if (!formData.vendorId) newErrors.vendorId = 'Vendor is required.';
    if (!formData.type) newErrors.type = 'Risk Type is required.';
    if (!formData.date) newErrors.date = 'Date is required.';
    if (!formData.description) newErrors.description = 'Description is required.';
    if (!formData.recommendations) newErrors.recommendations = 'Recommendations are required.';
    if (formData.scoreImpact && isNaN(parseInt(formData.scoreImpact))) newErrors.scoreImpact = 'Score Impact must be a number.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canCreate && !canEdit) {
      addToast({ message: "You don't have permission to perform this action.", type: 'error' });
      return;
    }
    if (validate()) {
      const newId = `RAS${String(DUMMY_DATA.riskAssessments.length + 1).padStart(3, '0')}`;
      const newAssessment = {
        id: existingAssessment?.id || newId,
        vendorId: formData.vendorId,
        vendorName: DUMMY_DATA.vendors.find(v => v.id === formData.vendorId)?.name || 'Unknown Vendor',
        type: formData.type,
        date: formData.date,
        scoreImpact: formData.scoreImpact ? parseInt(formData.scoreImpact) : 0,
        description: formData.description,
        recommendations: formData.recommendations,
        assignedTo: currentUser.label,
        status: formData.status,
        slaStatus: formData.status === 'Approved' ? 'Completed' : (formData.status === 'Action Required' ? 'SLA Breach' : 'On Track'),
        workflowHistory: existingAssessment?.workflowHistory || [{ stage: 'Initiated', date: new Date().toISOString() }],
        riskForm: { type: formData.type, impact: formData.impact, mitigatingActions: formData.mitigatingActions },
      };

      if (formData.status === 'Submitted' && !newAssessment.workflowHistory.some(h => h.stage === 'Submitted')) {
        newAssessment.workflowHistory.push({ stage: 'Data Gathering', date: new Date().toISOString() });
        newAssessment.workflowHistory.push({ stage: 'Submitted', date: new Date().toISOString() });
      } else if (formData.status === 'Approved' && !newAssessment.workflowHistory.some(h => h.stage === 'Approved')) {
        newAssessment.workflowHistory.push({ stage: 'Analysis', date: new Date().toISOString() });
        newAssessment.workflowHistory.push({ stage: 'Recommendation', date: new Date().toISOString() });
        newAssessment.workflowHistory.push({ stage: 'Approved', date: new Date().toISOString() });
      }

      if (isEditing) {
        DUMMY_DATA.riskAssessments = DUMMY_DATA.riskAssessments.map(ra => ra.id === newAssessment.id ? newAssessment : ra);
        addToast({ message: `Risk Assessment ${newAssessment.id} updated successfully!`, type: 'success' });
      } else {
        DUMMY_DATA.riskAssessments.push(newAssessment);
        addToast({ message: `New Risk Assessment for ${newAssessment.vendorName} initiated!`, type: 'success' });
      }
      navigate('RiskAssessmentList');
    } else {
      addToast({ message: 'Please correct the form errors.', type: 'error' });
    }
  };

  const breadcrumbPath = [
    { name: 'Dashboard', screen: 'Dashboard' },
    { name: 'Risk Assessments', screen: 'RiskAssessmentList' },
    { name: isEditing ? `Edit Assessment ${existingAssessment?.id}` : 'New Risk Assessment' }
  ];

  return (
    <div className="screen-content">
      <Breadcrumb path={breadcrumbPath} navigate={navigate} />
      <div className="screen-header">
        <h1>{isEditing ? `Edit Risk Assessment: ${existingAssessment?.vendorName}` : 'Initiate New Risk Assessment'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="vendorId">Vendor <span className="error-message">*</span></label>
          <select id="vendorId" name="vendorId" value={formData.vendorId} onChange={handleChange} disabled={isEditing && !canEdit}>
            <option value="" disabled>Select a vendor...</option>
            {DUMMY_DATA.vendors.map(vendor => (
              <option key={vendor.id} value={vendor.id}>{vendor.name}</option>
            ))}
          </select>
          {errors.vendorId && <span className="error-message">{errors.vendorId}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="type">Risk Type <span className="error-message">*</span></label>
          <input type="text" id="type" name="type" value={formData.type} onChange={handleChange} disabled={!canEdit && isEditing} />
          {errors.type && <span className="error-message">{errors.type}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="date">Assessment Date <span className="error-message">*</span></label>
          <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} disabled={!canEdit && isEditing} />
          {errors.date && <span className="error-message">{errors.date}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="impact">Impact Level</label>
          <select id="impact" name="impact" value={formData.impact} onChange={handleChange} disabled={!canEdit && isEditing}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="scoreImpact">Estimated Score Impact</label>
          <input type="number" id="scoreImpact" name="scoreImpact" value={formData.scoreImpact} onChange={handleChange} disabled={!canEdit && isEditing} />
          {errors.scoreImpact && <span className="error-message">{errors.scoreImpact}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description <span className="error-message">*</span></label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} disabled={!canEdit && isEditing} />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="recommendations">Recommendations <span className="error-message">*</span></label>
          <textarea id="recommendations" name="recommendations" value={formData.recommendations} onChange={handleChange} disabled={!canEdit && isEditing} />
          {errors.recommendations && <span className="error-message">{errors.recommendations}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="mitigatingActions">Mitigating Actions</label>
          <textarea id="mitigatingActions" name="mitigatingActions" value={formData.mitigatingActions} onChange={handleChange} disabled={!canEdit && isEditing} />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={formData.status} onChange={handleChange} disabled={!canEdit && isEditing}>
            <option value="Initiated">Initiated</option>
            <option value="Submitted">Submitted</option>
            <option value="Action Required">Action Required</option>
            <option value="Approved">Approved</option>
          </select>
        </div>
        {canEdit && (
          <div className="form-group">
            <label htmlFor="file-upload">Upload Supporting Document</label>
            <div className="file-upload-wrapper">
              <input type="file" id="file-upload" name="file" onChange={handleChange} />
              <label htmlFor="file-upload">Choose File</label>
              <span className="file-upload-filename">{formData.file ? formData.file.name : 'No file chosen'}</span>
            </div>
          </div>
        )}
        <div className="form-actions">
          <button type="button" className="button button-secondary" onClick={() => navigate('RiskAssessmentList')}>Cancel</button>
          <button type="submit" className="button button-primary" disabled={!canCreate && !canEdit}>
            {isEditing ? 'Save Changes' : 'Initiate Assessment'}
          </button>
        </div>
      </form>
    </div>
  );
};


const ReportViewerScreen = ({ navigate, currentUser }) => {
  const reports = [
    { id: 'R001', name: 'Enterprise Risk Summary', description: 'Aggregated view of all vendor risks and exposure.', type: 'summary', icon: FaChartPie, status: 'active' },
    { id: 'R002', name: 'Vendor Compliance Overview', description: 'Detailed compliance status across all vendors.', type: 'compliance', icon: FaClipboardCheck, status: 'info' },
    { id: 'R003', name: 'Onboarding Performance Report', description: 'Metrics on vendor onboarding efficiency.', type: 'onboarding', icon: FaChartBar, status: 'info' },
    { id: 'R004', name: 'SLA Breach Analysis', description: 'Report on all SLA breaches in workflows.', type: 'sla', icon: FaExclamationTriangle, status: 'high-risk' },
  ].filter(report => {
    // Only show reports relevant to the user's role/permissions implicitly.
    // E.g., Exec sponsor sees all, Procurement might not see model config.
    if (currentUser.role === 'procurement_manager' && report.type === 'compliance') return false;
    if (currentUser.role === 'compliance_officer' && report.type === 'sla') return false;
    return true;
  });

  const breadcrumbPath = [
    { name: 'Dashboard', screen: 'Dashboard' },
    { name: 'Reports', screen: 'ReportViewer' }
  ];

  return (
    <div className="screen-content">
      <Breadcrumb path={breadcrumbPath} navigate={navigate} />
      <div className="screen-header">
        <h1>Reports</h1>
        <div className="flex-row gap-md">
          <button className="button button-secondary"><FaFileDownload /> Export to PDF</button>
          <button className="button button-secondary"><FaFileExcel /> Export to Excel</button>
        </div>
      </div>
      {reports.length === 0 ? (
        <NoDataIllustration message="No reports available for your role." />
      ) : (
        <div className="card-grid">
          {reports.map(report => (
            <div key={report.id} className={getStatusClass(report.status)}>
              <div className="card-header">{React.createElement(report.icon)} {report.name}</div>
              <div className="card-body">
                <p>{report.description}</p>
                <div className="chart-container" style={{ width: '100%', height: '150px' }}>
                  <h4>{report.name} Chart (Placeholder)</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SettingsScreen = ({ navigate, currentUser }) => {
  const canConfigModels = currentUser.canEdit.includes('RiskModelForm');
  const settingsOptions = [
    { id: 'model_config', name: 'Risk Model Configuration', icon: GiGears, description: 'Adjust parameters and weights for risk scoring models.', navigateTo: 'RiskModelConfigForm', status: 'in-progress', disabled: !canConfigModels },
    { id: 'user_management', name: 'User & Role Management', icon: FaUserShield, description: 'Manage users, roles, and permissions.', navigateTo: 'UserManagementScreen', status: 'info', disabled: true }, // Placeholder for future
    { id: 'audit_config', name: 'Audit Trail Settings', icon: FaLock, description: 'Configure audit logging and retention policies.', navigateTo: 'AuditConfigScreen', status: 'info', disabled: true }, // Placeholder for future
  ].filter(setting => !setting.disabled); // Only show accessible settings for now

  const breadcrumbPath = [
    { name: 'Dashboard', screen: 'Dashboard' },
    { name: 'Settings', screen: 'Settings' }
  ];

  return (
    <div className="screen-content">
      <Breadcrumb path={breadcrumbPath} navigate={navigate} />
      <div className="screen-header">
        <h1>Settings</h1>
      </div>

      {settingsOptions.length === 0 ? (
        <NoDataIllustration message="No settings available for your role." />
      ) : (
        <div className="card-grid">
          {settingsOptions.map(setting => (
            <div key={setting.id} className={getStatusClass(setting.status)} onClick={setting.navigateTo ? () => navigate(setting.navigateTo) : null}>
              <div className="card-header">{React.createElement(setting.icon)} {setting.name}</div>
              <div className="card-body">
                <p>{setting.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


const RiskModelConfigForm = ({ navigate, currentUser, addToast }) => {
  const canEdit = currentUser.canEdit.includes('RiskModelForm');
  const [formData, setFormData] = useState({
    financialWeight: '0.3',
    complianceWeight: '0.25',
    esgWeight: '0.2',
    operationalWeight: '0.25',
    lastUpdated: '2024-04-16',
    updatedBy: 'Risk Analyst',
    status: 'Draft'
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    const totalWeight = parseFloat(formData.financialWeight) + parseFloat(formData.complianceWeight) + parseFloat(formData.esgWeight) + parseFloat(formData.operationalWeight);
    if (Math.abs(totalWeight - 1.0) > 0.001) { // Floating point comparison
      newErrors.totalWeight = 'Total weights must sum to 1.0.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canEdit) {
      addToast({ message: "You don't have permission to edit risk models.", type: 'error' });
      return;
    }
    if (validate()) {
      addToast({ message: 'Risk Model Configuration saved successfully!', type: 'success' });
      // In a real app, this would update a backend service
      console.log('Risk Model Config Saved:', formData);
      navigate('Settings');
    } else {
      addToast({ message: 'Please correct the form errors.', type: 'error' });
    }
  };

  const breadcrumbPath = [
    { name: 'Dashboard', screen: 'Dashboard' },
    { name: 'Settings', screen: 'Settings' },
    { name: 'Risk Model Configuration' }
  ];

  return (
    <div className="screen-content">
      <Breadcrumb path={breadcrumbPath} navigate={navigate} />
      <div className="screen-header">
        <h1>Risk Model Configuration</h1>
      </div>

      <form onSubmit={handleSubmit} className="form-container">
        <p style={{ color: 'var(--color-status-grey)', marginBottom: 'var(--spacing-md)' }}>Adjust the weighting parameters for the overall vendor risk score calculation.</p>
        <div className="form-group">
          <label htmlFor="financialWeight">Financial Stability Weight</label>
          <input type="number" step="0.01" id="financialWeight" name="financialWeight" value={formData.financialWeight} onChange={handleChange} disabled={!canEdit} />
        </div>
        <div className="form-group">
          <label htmlFor="complianceWeight">Compliance & Regulatory Weight</label>
          <input type="number" step="0.01" id="complianceWeight" name="complianceWeight" value={formData.complianceWeight} onChange={handleChange} disabled={!canEdit} />
        </div>
        <div className="form-group">
          <label htmlFor="esgWeight">ESG Metrics Weight</label>
          <input type="number" step="0.01" id="esgWeight" name="esgWeight" value={formData.esgWeight} onChange={handleChange} disabled={!canEdit} />
        </div>
        <div className="form-group">
          <label htmlFor="operationalWeight">Operational Performance Weight</label>
          <input type="number" step="0.01" id="operationalWeight" name="operationalWeight" value={formData.operationalWeight} onChange={handleChange} disabled={!canEdit} />
        </div>
        {errors.totalWeight && <span className="error-message">{errors.totalWeight}</span>}
        <div className="detail-item" style={{ marginTop: 'var(--spacing-md)' }}>
            <span className="detail-item-key">Last Updated:</span>
            <span className="detail-item-value">{formData.lastUpdated} by {formData.updatedBy}</span>
          </div>

        <div className="form-actions">
          <button type="button" className="button button-secondary" onClick={() => navigate('Settings')}>Cancel</button>
          <button type="submit" className="button button-primary" disabled={!canEdit}>Save Configuration</button>
        </div>
      </form>
    </div>
  );
};

const NotFoundScreen = ({ navigate }) => (
  <div className="screen-content text-center" style={{ padding: 'var(--spacing-xxl)' }}>
    <h1 style={{ color: 'var(--color-status-red)' }}>404 - Page Not Found</h1>
    <p style={{ color: 'var(--color-text-light)' }}>The screen you are trying to access does not exist or you do not have permissions.</p>
    <button className="button button-primary mt-md" onClick={() => navigate('Dashboard')}>Go to Dashboard</button>
  </div>
);

// --- MAIN APP COMPONENT ---
export const App = () => {
  const [currentUserRole, setCurrentUserRole] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('Dashboard');
  const [currentRecordId, setCurrentRecordId] = useState(null);
  const [screenHistory, setScreenHistory] = useState([]);
  const [toasts, setToasts] = useState([]);

  const currentUser = currentUserRole ? ROLES[currentUserRole] : null;

  const addToast = useCallback((toast) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, ...toast }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const canAccess = useCallback((screenName, recordId = null) => {
    if (!currentUser) return false;
    // Special handling for form screens passed with an object
    const actualScreenName = typeof screenName === 'object' ? Object.keys(ROLES[currentUserRole].canView).find(key => key.includes('Form')) : screenName;
    return currentUser.canView.includes(actualScreenName || screenName);
  }, [currentUser, currentUserRole]);


  const navigate = useCallback((screenName, recordId = null) => {
    if (!currentUser) {
      setCurrentScreen('Login');
      setCurrentRecordId(null);
      setScreenHistory([]);
      return;
    }

    let targetScreenName = screenName;
    let targetRecordId = recordId;

    if (screenName === 'VendorList' && recordId === 'High Risk') {
      targetScreenName = 'VendorList';
      targetRecordId = 'High Risk'; // Pass filter directly
    }
     if (screenName === 'AuditList' && recordId === 'Pending/In Progress') {
      targetScreenName = 'AuditList';
      targetRecordId = ['Pending Review', 'In Progress', 'Scheduled']; // Pass filter as array
    }

    if (!canAccess(targetScreenName)) {
      addToast({ message: `Access Denied: You do not have permission to view '${targetScreenName}'.`, type: 'error' });
      setCurrentScreen('NotFound');
      setCurrentRecordId(null);
      setScreenHistory(prev => [...prev, { screen: 'NotFound', id: null }]);
      return;
    }

    setScreenHistory(prev => {
      const lastEntry = prev[prev.length - 1];
      // Prevent duplicate history entries if navigating to the same screen/record
      if (lastEntry && lastEntry.screen === targetScreenName && lastEntry.id === targetRecordId) {
        return prev;
      }
      return [...prev, { screen: currentScreen, id: currentRecordId }];
    });
    setCurrentScreen(targetScreenName);
    setCurrentRecordId(targetRecordId);
  }, [currentUser, canAccess, currentScreen, currentRecordId, addToast]);

  const handleBack = useCallback(() => {
    if (screenHistory.length > 0) {
      const lastScreen = screenHistory[screenHistory.length - 1];
      setScreenHistory(prev => prev.slice(0, -1)); // Remove last item
      setCurrentScreen(lastScreen.screen);
      setCurrentRecordId(lastScreen.id);
    } else {
      // If no history, go to dashboard
      setCurrentScreen('Dashboard');
      setCurrentRecordId(null);
    }
  }, [screenHistory]);

  const renderScreen = () => {
    if (!currentUserRole) {
      return <LoginScreen onLogin={setCurrentUserRole} />;
    }

    const breadcrumbPath = [
      { name: 'Dashboard', screen: 'Dashboard' }
    ];

    if (currentScreen !== 'Dashboard') {
      breadcrumbPath.push({ name: currentScreen, screen: currentScreen, id: currentRecordId });
    }

    const commonProps = { navigate, currentUser, addToast, breadcrumbPath, handleBack };

    switch (currentScreen) {
      case 'Dashboard':
        return <DashboardScreen {...commonProps} />;
      case 'VendorList':
        return <VendorListScreen {...commonProps} filter={currentRecordId} />;
      case 'VendorDetail':
        return <VendorDetailScreen vendorId={currentRecordId} {...commonProps} />;
      case 'VendorForm':
        return <VendorFormScreen vendorId={currentRecordId} {...commonProps} />;
      case 'OnboardingList':
        return <OnboardingListScreen {...commonProps} />;
      case 'OnboardingDetail':
        return <OnboardingDetailScreen requestId={currentRecordId} {...commonProps} />;
      case 'OnboardingForm':
        return <OnboardingFormScreen recordData={currentRecordId} {...commonProps} />;
      case 'AuditList':
        return <AuditListScreen {...commonProps} />;
      case 'AuditDetail':
        return <AuditDetailScreen auditId={currentRecordId} {...commonProps} />;
      case 'AuditForm':
        return <AuditFormScreen auditId={currentRecordId} {...commonProps} />;
      case 'RiskAssessmentList':
        return <RiskAssessmentListScreen {...commonProps} />;
      case 'RiskAssessmentDetail':
        return <RiskAssessmentDetailScreen assessmentId={currentRecordId} {...commonProps} />;
      case 'RiskAssessmentForm':
        return <RiskAssessmentFormScreen recordData={currentRecordId} {...commonProps} />;
      case 'ActivityLog':
        return <ActivityLogScreen {...commonProps} />;
      case 'ReportViewer':
        return <ReportViewerScreen {...commonProps} />;
      case 'Settings':
        return <SettingsScreen {...commonProps} />;
      case 'RiskModelConfigForm':
        return <RiskModelConfigForm {...commonProps} />;
      case 'NotFound':
        return <NotFoundScreen {...commonProps} />;
      default:
        return <NotFoundScreen {...commonProps} />;
    }
  };

  const logout = () => {
    setCurrentUserRole(null);
    setCurrentScreen('Login');
    setCurrentRecordId(null);
    setScreenHistory([]);
  };

  return (
    <div className="app-container">
      <Header currentUser={currentUser} logout={logout} navigate={navigate} />
      <div className="main-content">
        {renderScreen()}
      </div>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default App;