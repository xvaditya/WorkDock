// Demo data for revenue leaks and smart followup pages
export const DEMO_REVENUE_LEAKS = [
  {
    _id: '1',
    leadId: '601a8c1e9f3a4b2c1d5e8f9a',
    reason: 'no_reply',
    estimatedLoss: 15000,
    detectedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: '2',
    leadId: '601a8c1e9f3a4b2c1d5e8f9b',
    reason: 'delayed_reply',
    estimatedLoss: 8500,
    detectedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: '3',
    leadId: '601a8c1e9f3a4b2c1d5e8f9c',
    reason: 'no_followup',
    estimatedLoss: 22000,
    detectedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: '4',
    leadId: '601a8c1e9f3a4b2c1d5e8f9d',
    reason: 'inactive',
    estimatedLoss: 35000,
    detectedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const DEMO_LEAK_DISTRIBUTION = {
  HOT: 3,
  WARM: 5,
  COLD: 7,
};

export const DEMO_TOTAL_LEAK_LOSS = 80500;

export const DEMO_LEADS = [
  {
    _id: '601a8c1e9f3a4b2c1d5e8f9a',
    name: 'Rajesh Kumar',
    contact: '9876543210',
    source: 'whatsapp',
    lastMessageTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    lastReplyTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    estimatedDealValue: 50000,
    status: 'contacted',
    followUpCount: 1,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: '601a8c1e9f3a4b2c1d5e8f9b',
    name: 'Priya Sharma',
    contact: '9876543211',
    source: 'instagram',
    lastMessageTime: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    lastReplyTime: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    estimatedDealValue: 35000,
    status: 'new',
    followUpCount: 0,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: '601a8c1e9f3a4b2c1d5e8f9c',
    name: 'Arjun Singh',
    contact: '9876543212',
    source: 'email',
    lastMessageTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    lastReplyTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    estimatedDealValue: 75000,
    status: 'followup',
    followUpCount: 2,
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: '601a8c1e9f3a4b2c1d5e8f9d',
    name: 'Neha Patel',
    contact: '9876543213',
    source: 'manual',
    lastMessageTime: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    lastReplyTime: null,
    estimatedDealValue: 120000,
    status: 'contacted',
    followUpCount: 3,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: '601a8c1e9f3a4b2c1d5e8f9e',
    name: 'Vikram Gupta',
    contact: '9876543214',
    source: 'whatsapp',
    lastMessageTime: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    lastReplyTime: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    estimatedDealValue: 45000,
    status: 'new',
    followUpCount: 0,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: '601a8c1e9f3a4b2c1d5e8f9f',
    name: 'Anjali Desai',
    contact: '9876543215',
    source: 'instagram',
    lastMessageTime: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    lastReplyTime: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    estimatedDealValue: 62000,
    status: 'followup',
    followUpCount: 1,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const DEMO_HEAT_SCORES = {
  '601a8c1e9f3a4b2c1d5e8f9a': 'COLD',
  '601a8c1e9f3a4b2c1d5e8f9b': 'HOT',
  '601a8c1e9f3a4b2c1d5e8f9c': 'WARM',
  '601a8c1e9f3a4b2c1d5e8f9d': 'COLD',
  '601a8c1e9f3a4b2c1d5e8f9e': 'HOT',
  '601a8c1e9f3a4b2c1d5e8f9f': 'WARM',
};
