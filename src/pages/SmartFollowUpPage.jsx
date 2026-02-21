import React, { useState, useEffect } from 'react';
import { leadsAPI, leakDetectionAPI } from '../utils/api';
import { GlassCard } from '../components/ui/GlassCard';
import { StatusBadge } from '../components/ui/StatusBadge';
import { MetricCard } from '../components/ui/MetricCard';

export function SmartFollowUpPage() {
  const [leads, setLeads] = useState([]);
  const [heatScores, setHeatScores] = useState({});
  const [loading, setLoading] = useState(true);
  const [expandedLead, setExpandedLead] = useState(null);

  const loadLeadsWithScores = async () => {
    setLoading(true);
    try {
      const leadsRes = await leadsAPI.getAll();
      const leadsList = leadsRes.data || [];
      setLeads(leadsList);

      // Fetch heat scores for each lead
      const scores = {};
      for (const lead of leadsList) {
        const scoreRes = await leakDetectionAPI.getHeatScore(lead._id);
        scores[lead._id] = scoreRes.data?.heatScore || 'UNKNOWN';
      }
      setHeatScores(scores);
    } catch (error) {
      console.error('Error loading leads:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadLeadsWithScores();
  }, []);

  const getFollowUpMessage = (heatScore) => {
    const messages = {
      HOT: {
        title: '🔥 URGENT - Hot Lead',
        message: 'Your response was quick! The client is highly engaged and ready to buy. This is the perfect time to close the deal. Send a personalized offer or schedule a product demo immediately.',
        action: 'Schedule product demo',
        color: 'rgba(251,146,60,0.15)',
      },
      WARM: {
        title: '🌡️ ENGAGED - Warm Lead',
        message: "Good engagement detected, but there's some hesitation. Address any concerns they might have, offer competitive pricing, or highlight unique selling points. A friendly follow-up call would be ideal.",
        action: 'Make a personal call',
        color: 'rgba(234,179,8,0.15)',
      },
      COLD: {
        title: '❄️ AT RISK - Cold Lead',
        message: 'This lead is going cold. They may have lost interest or found alternatives. Re-engage them immediately with a special offer, new product feature, or value proposition. Time is critical!',
        action: 'Send special offer',
        color: 'rgba(96,165,250,0.15)',
      },
    };
    return messages[heatScore] || messages.COLD;
  };

  const getHeatColor = (heatScore) => {
    const colors = {
      HOT: '#f97316',
      WARM: '#eab308',
      COLD: '#60a5fa',
    };
    return colors[heatScore] || '#6b7280';
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const hotCount = Object.values(heatScores).filter((s) => s === 'HOT').length;
  const warmCount = Object.values(heatScores).filter((s) => s === 'WARM').length;
  const coldCount = Object.values(heatScores).filter((s) => s === 'COLD').length;

  return (
    <div>
      <div style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: 3, color: '#6b7280', marginBottom: 4 }}>LEAD MANAGEMENT</div>
      <div style={{ fontFamily: "'Exo 2', monospace", fontWeight: 800, fontSize: 22, color: '#e2d9f3', letterSpacing: 2, marginBottom: 24 }}>SMART FOLLOWUP ENGINE</div>

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <MetricCard
          label="TOTAL LEADS"
          value={leads.length}
          sparkData={[5, 7, 6, 8, 9, 10, leads.length]}
          delta={5.2}
        />
        <MetricCard
          label="HOT LEADS"
          value={hotCount}
          sparkData={[2, 3, 2, 4, 3, 5, hotCount]}
          delta={8.2}
          color="#f97316"
        />
        <MetricCard
          label="WARM LEADS"
          value={warmCount}
          sparkData={[4, 5, 6, 5, 7, 6, warmCount]}
          delta={3.1}
          color="#eab308"
        />
        <MetricCard
          label="COLD LEADS"
          value={coldCount}
          sparkData={[3, 4, 3, 5, 4, 6, coldCount]}
          delta={-2.4}
          color="#60a5fa"
        />
      </div>

      {/* Leads Table */}
      <div style={{ marginBottom: 16 }}>
        <GlassCard>
          <div style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: 3, color: '#6b7280', marginBottom: 16 }}>INTELLIGENT LEAD SCORING</div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(107,70,193,0.2)' }}>
                {['LEAD NAME', 'CONTACT', 'HEAT SCORE', 'STATUS', 'DEAL VALUE'].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: '8px 12px',
                      textAlign: 'left',
                      fontFamily: 'monospace',
                      fontSize: 9,
                      letterSpacing: 2,
                      color: '#4b5563',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" style={{ padding: '24px', textAlign: 'center', color: '#9ca3af' }}>
                    Loading leads...
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ padding: '24px', textAlign: 'center', color: '#9ca3af' }}>
                    No leads found. Create one to get started!
                  </td>
                </tr>
              ) : (
                leads.map((lead) => {
                  const heatScore = heatScores[lead._id] || 'UNKNOWN';
                  const isExpanded = expandedLead === lead._id;
                  return (
                    <React.Fragment key={lead._id}>
                      <tr
                        style={{
                          borderBottom: '1px solid rgba(107,70,193,0.08)',
                          cursor: 'pointer',
                          background: isExpanded ? 'rgba(107,70,193,0.1)' : 'transparent',
                        }}
                        onClick={() => setExpandedLead(isExpanded ? null : lead._id)}
                      >
                        <td style={{ padding: '12px', fontFamily: 'monospace', fontSize: 11, color: '#d1d5db' }}>
                          {lead.name}
                        </td>
                        <td style={{ padding: '12px', fontFamily: 'monospace', fontSize: 10, color: '#9ca3af' }}>
                          {lead.contact}
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span style={{ padding: '4px 12px', borderRadius: 4, fontFamily: 'monospace', fontSize: 10, fontWeight: 600, color: '#fff', background: getHeatColor(heatScore) }}>
                            {heatScore}
                          </span>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <StatusBadge status={lead.status || 'new'} />
                        </td>
                        <td style={{ padding: '12px', fontFamily: 'monospace', fontSize: 11, color: '#86efac', fontWeight: 600 }}>
                          ₹{(lead.estimatedDealValue || 0).toLocaleString('en-IN')}
                        </td>
                      </tr>

                      {/* Expanded Details */}
                      {isExpanded && (
                        <tr style={{ background: 'rgba(107,70,193,0.05)' }}>
                          <td colSpan="5" style={{ padding: '20px', borderBottom: '1px solid rgba(107,70,193,0.15)' }}>
                            {(() => {
                              const heatScore = heatScores[lead._id] || 'COLD';
                              const suggestion = getFollowUpMessage(heatScore);
                              return (
                                <div>
                                  {/* Suggestion Box */}
                                  <div style={{ padding: 16, borderRadius: 8, background: suggestion.color, border: '1px solid rgba(255,255,255,0.1)', marginBottom: 16 }}>
                                    <div style={{ fontFamily: "'Exo 2', monospace", fontWeight: 700, fontSize: 13, color: '#fff', marginBottom: 8 }}>
                                      {suggestion.title}
                                    </div>
                                    <p style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.5, marginBottom: 12 }}>
                                      {suggestion.message}
                                    </p>
                                    <button style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 6, color: '#fff', fontFamily: "'Exo 2', monospace", fontWeight: 600, fontSize: 11, cursor: 'pointer' }}>
                                      ✉️ {suggestion.action}
                                    </button>
                                  </div>

                                  {/* Lead Details */}
                                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 16 }}>
                                    <div style={{ padding: 12, background: 'rgba(107,70,193,0.1)', borderRadius: 6 }}>
                                      <div style={{ fontSize: 9, color: '#9ca3af', marginBottom: 4, fontFamily: 'monospace', letterSpacing: 1, textTransform: 'uppercase' }}>Source</div>
                                      <div style={{ fontSize: 12, color: '#d1d5db', fontWeight: 600 }}>{lead.source || 'N/A'}</div>
                                    </div>
                                    <div style={{ padding: 12, background: 'rgba(107,70,193,0.1)', borderRadius: 6 }}>
                                      <div style={{ fontSize: 9, color: '#9ca3af', marginBottom: 4, fontFamily: 'monospace', letterSpacing: 1, textTransform: 'uppercase' }}>Last Message</div>
                                      <div style={{ fontSize: 11, color: '#d1d5db' }}>{formatDate(lead.lastMessageTime)}</div>
                                    </div>
                                    <div style={{ padding: 12, background: 'rgba(107,70,193,0.1)', borderRadius: 6 }}>
                                      <div style={{ fontSize: 9, color: '#9ca3af', marginBottom: 4, fontFamily: 'monospace', letterSpacing: 1, textTransform: 'uppercase' }}>Follow-ups</div>
                                      <div style={{ fontSize: 12, color: '#d1d5db', fontWeight: 600 }}>{lead.followUpCount || 0}</div>
                                    </div>
                                    <div style={{ padding: 12, background: 'rgba(107,70,193,0.1)', borderRadius: 6 }}>
                                      <div style={{ fontSize: 9, color: '#9ca3af', marginBottom: 4, fontFamily: 'monospace', letterSpacing: 1, textTransform: 'uppercase' }}>Current Status</div>
                                      <div style={{ fontSize: 12, color: '#d1d5db', fontWeight: 600, textTransform: 'capitalize' }}>{lead.status || 'new'}</div>
                                    </div>
                                  </div>

                                  {/* Action Buttons */}
                                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                                    <button style={{ padding: '10px 12px', background: '#10b981', hover: '#059669', border: 'none', borderRadius: 6, color: '#fff', fontFamily: "'Exo 2', monospace", fontWeight: 600, fontSize: 11, cursor: 'pointer' }}>
                                      ✅ Mark Closed
                                    </button>
                                    <button style={{ padding: '10px 12px', background: '#3b82f6', border: 'none', borderRadius: 6, color: '#fff', fontFamily: "'Exo 2', monospace", fontWeight: 600, fontSize: 11, cursor: 'pointer' }}>
                                      📞 Call Now
                                    </button>
                                    <button style={{ padding: '10px 12px', background: '#a855f7', border: 'none', borderRadius: 6, color: '#fff', fontFamily: "'Exo 2', monospace", fontWeight: 600, fontSize: 11, cursor: 'pointer' }}>
                                      💬 Message
                                    </button>
                                  </div>
                                </div>
                              );
                            })()}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </GlassCard>
      </div>

      {/* Info Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <GlassCard>
          <div style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: 3, color: '#6b7280', marginBottom: 12 }}>HEAT SCORE GUIDE</div>
          <div style={{ fontFamily: "'Exo 2', monospace", fontWeight: 700, fontSize: 13, color: '#d8b4fe', marginBottom: 12, letterSpacing: 0.5 }}>LEAD TEMPERATURE</div>
          <div style={{ fontSize: 11, color: '#d1d5db', lineHeight: 1.7 }}>
            <div style={{ marginBottom: 12 }}>
              <span style={{ color: '#f97316', fontWeight: 600 }}>🔥 HOT (0-1h):</span> High intent, ready to buy
            </div>
            <div style={{ marginBottom: 12 }}>
              <span style={{ color: '#eab308', fontWeight: 600 }}>🌡️ WARM (1-6h):</span> Good engagement, slight hesitation
            </div>
            <div>
              <span style={{ color: '#60a5fa', fontWeight: 600 }}>❄️ COLD (24h+):</span> Losing interest, needs re-engagement
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: 3, color: '#6b7280', marginBottom: 12 }}>ACTION GUIDE</div>
          <div style={{ fontFamily: "'Exo 2', monospace", fontWeight: 700, fontSize: 13, color: '#d8b4fe', marginBottom: 12, letterSpacing: 0.5 }}>RESPONSE STRATEGIES</div>
          <div style={{ fontSize: 11, color: '#d1d5db', lineHeight: 1.7 }}>
            <div style={{ marginBottom: 8 }}>• <strong>HOT:</strong> Close deal immediately</div>
            <div style={{ marginBottom: 8 }}>• <strong>WARM:</strong> Address concerns, offer value</div>
            <div>• <strong>COLD:</strong> Re-engagement with special offer</div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
