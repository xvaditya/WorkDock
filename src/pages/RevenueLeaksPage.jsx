import React, { useState, useEffect } from 'react';
import { leakDetectionAPI } from '../utils/api';
import { GlassCard } from '../components/ui/GlassCard';
import { StatusBadge } from '../components/ui/StatusBadge';
import { MetricCard } from '../components/ui/MetricCard';

export function RevenueLeaksPage() {
  const [leaks, setLeaks] = useState([]);
  const [distribution, setDistribution] = useState({});
  const [totalLoss, setTotalLoss] = useState(0);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);

  const loadLeakData = async () => {
    setLoading(true);
    try {
      const [leaksRes, distributionRes, lossRes] = await Promise.all([
        leakDetectionAPI.getAllLeaks(),
        leakDetectionAPI.getDistribution(),
        leakDetectionAPI.getTotalLoss(),
      ]);

      setLeaks(leaksRes.data || []);
      setDistribution(distributionRes.data || {});
      setTotalLoss(lossRes.data || 0);
    } catch (error) {
      console.error('Error loading leak data:', error);
    }
    setLoading(false);
  };

  const handleScanLeaks = async () => {
    setScanning(true);
    try {
      await leakDetectionAPI.scanForLeaks();
      await loadLeakData();
    } catch (error) {
      console.error('Error scanning leaks:', error);
    }
    setScanning(false);
  };

  useEffect(() => {
    loadLeakData();
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getReasonLabel = (reason) => {
    const reasons = {
      no_reply: 'No Reply (24h+)',
      delayed_reply: 'Delayed Reply',
      no_followup: 'No Followup',
      inactive: 'Inactive',
    };
    return reasons[reason] || reason;
  };

  const getLeakColor = (reason) => {
    const colors = {
      no_reply: '#ef4444',
      delayed_reply: '#f97316',
      no_followup: '#eab308',
      inactive: '#a855f7',
    };
    return colors[reason] || '#6b7280';
  };

  return (
    <div>
      <div style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: 3, color: '#6b7280', marginBottom: 4 }}>REVENUE INTELLIGENCE</div>
      <div style={{ fontFamily: "'Exo 2', monospace", fontWeight: 800, fontSize: 22, color: '#e2d9f3', letterSpacing: 2, marginBottom: 24 }}>LEAK DETECTION ENGINE</div>

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <MetricCard
          label="REVENUE LOSS"
          value={Math.floor(totalLoss)}
          prefix="₹"
          sparkData={[10000, 15000, 12000, 18000, 20000, 25000, totalLoss]}
          delta={-12.5}
          color="#ef4444"
        />
        <MetricCard
          label="HOT LEADS"
          value={distribution.HOT || 0}
          sparkData={[2, 3, 2, 4, 3, 5, distribution.HOT || 0]}
          delta={8.2}
          color="#f97316"
        />
        <MetricCard
          label="WARM LEADS"
          value={distribution.WARM || 0}
          sparkData={[4, 5, 6, 5, 7, 6, distribution.WARM || 0]}
          delta={3.1}
          color="#eab308"
        />
        <MetricCard
          label="COLD LEADS"
          value={distribution.COLD || 0}
          sparkData={[3, 4, 3, 5, 4, 6, distribution.COLD || 0]}
          delta={-2.4}
          color="#60a5fa"
        />
      </div>

      {/* Scan Button */}
      <GlassCard>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16 }}>
          <div>
            <div style={{ fontFamily: "'Exo 2', monospace", fontWeight: 700, fontSize: 15, color: '#d8b4fe', letterSpacing: 1 }}>
              🔍 AUTO-SCAN FOR REVENUE LEAKS
            </div>
            <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>Automatically detect lost revenue opportunities from your leads</div>
          </div>
          <button
            onClick={handleScanLeaks}
            disabled={scanning}
            style={{
              padding: '10px 24px',
              background: scanning ? '#6b7280' : '#3b82f6',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontFamily: "'Exo 2', monospace",
              fontWeight: 600,
              fontSize: 12,
              cursor: scanning ? 'not-allowed' : 'pointer',
              opacity: scanning ? 0.6 : 1,
              transition: 'all 0.3s',
            }}
          >
            {scanning ? '⏳ SCANNING...' : '🔥 SCAN NOW'}
          </button>
        </div>
      </GlassCard>

      {/* Leaks Table */}
      <div style={{ marginTop: 16 }}>
        <GlassCard alert={leaks.length > 0}>
          <div style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: 3, color: leaks.length > 0 ? '#ef4444' : '#6b7280', marginBottom: 16 }}>
            {leaks.length > 0 ? 'CRITICAL ALERTS' : 'SYSTEM STATUS'}
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(107,70,193,0.2)' }}>
                {['LEAD ID', 'REASON', 'STATUS', 'ESTIMATED LOSS', 'DETECTED'].map((h) => (
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
                    Loading leaks...
                  </td>
                </tr>
              ) : leaks.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ padding: '24px', textAlign: 'center', color: '#10b981' }}>
                    ✅ No revenue leaks detected! All leads are being followed up properly.
                  </td>
                </tr>
              ) : (
                leaks.map((leak, idx) => (
                  <tr key={leak._id || idx} style={{ borderBottom: '1px solid rgba(107,70,193,0.08)' }}>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 11, color: '#d1d5db' }}>
                      #{leak.leadId?.toString().slice(-6) || 'N/A'}
                    </td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 11, color: getLeakColor(leak.reason) }}>
                      {getReasonLabel(leak.reason)}
                    </td>
                    <td style={{ padding: '8px 12px' }}>
                      <StatusBadge status={leak.reason} />
                    </td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 11, color: '#fca5a5', fontWeight: 600 }}>
                      {formatCurrency(leak.estimatedLoss)}
                    </td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 9, color: '#9ca3af' }}>
                      {new Date(leak.detectedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </GlassCard>
      </div>

      {/* Info Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
        <GlassCard>
          <div style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: 3, color: '#6b7280', marginBottom: 12 }}>HOW IT WORKS</div>
          <div style={{ fontFamily: "'Exo 2', monospace", fontWeight: 700, fontSize: 13, color: '#d8b4fe', marginBottom: 12, letterSpacing: 0.5 }}>HEAT SCORE SYSTEM</div>
          <div style={{ fontSize: 11, color: '#d1d5db', lineHeight: 1.6 }}>
            <div style={{ marginBottom: 12 }}>
              <span style={{ color: '#f97316', fontWeight: 600 }}>🔥 HOT:</span> Response &lt; 1 hour — Immediate action needed
            </div>
            <div style={{ marginBottom: 12 }}>
              <span style={{ color: '#eab308', fontWeight: 600 }}>🌡️ WARM:</span> Response 1-6 hours — Good engagement
            </div>
            <div>
              <span style={{ color: '#60a5fa', fontWeight: 600 }}>❄️ COLD:</span> Response 24h+ — Need re-engagement
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: 3, color: '#6b7280', marginBottom: 12 }}>DETECTION RULES</div>
          <div style={{ fontFamily: "'Exo 2', monospace", fontWeight: 700, fontSize: 13, color: '#d8b4fe', marginBottom: 12, letterSpacing: 0.5 }}>AUTOMATIC TRIGGERS</div>
          <div style={{ fontSize: 11, color: '#d1d5db', lineHeight: 1.6 }}>
            <div style={{ marginBottom: 8 }}>• No reply for 24+ hours</div>
            <div style={{ marginBottom: 8 }}>• Status contacted but no followup in 48h</div>
            <div style={{ marginBottom: 8 }}>• Lead marked as inactive/lost</div>
            <div>• Delayed response pattern detected</div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
