import Lead from '../models/Lead.js';
import RevenueLeakLog from '../models/RevenueLeakLog.js';

class RevenueLeakService {
  /**
   * Detect if a lead is a revenue leak
   * Returns: { isLeak, reason, estimatedLoss, heatScore }
   */
  static async detectLeak(leadId) {
    const lead = await Lead.findById(leadId);
    if (!lead) throw new Error('Lead not found');

    const now = new Date();
    const hoursWithoutReply = lead.lastReplyTime
      ? Math.floor((now - lead.lastReplyTime) / (1000 * 60 * 60))
      : Infinity;

    let isLeak = false;
    let reason = null;

    // Check 1: Unreplied Lead (no reply for 24+ hours)
    if (lead.lastReplyTime === null || hoursWithoutReply > 24) {
      isLeak = true;
      reason = 'no_reply';
    }

    // Check 2: No Follow-Up (contacted but no followup for 48+ hours)
    if (
      lead.status === 'contacted' &&
      lead.followUpCount === 0 &&
      hoursWithoutReply > 48
    ) {
      isLeak = true;
      reason = 'no_followup';
    }

    // Check 3: Delayed Reply (6-24 hours without action)
    if (hoursWithoutReply > 24 && hoursWithoutReply <= 48) {
      reason = reason || 'delayed_reply';
    }

    // Check 4: Inactive Lead (status = lost or not contacted for long)
    if (lead.status === 'lost' || (lead.status === 'new' && hoursWithoutReply > 72)) {
      isLeak = true;
      reason = reason || 'inactive';
    }

    return {
      isLeak,
      reason,
      estimatedLoss: isLeak ? lead.estimatedDealValue : 0,
      heatScore: lead.heatScore,
      hoursWithoutReply,
    };
  }

  /**
   * Get heat score for a lead
   */
  static getHeatScore(lead) {
    if (!lead.lastReplyTime) return 'COLD';
    const hoursAgo = Math.floor((new Date() - lead.lastReplyTime) / (1000 * 60 * 60));
    if (hoursAgo < 1) return 'HOT';
    if (hoursAgo < 6) return 'WARM';
    return 'COLD';
  }

  /**
   * Generate smart follow-up message based on heat score
   */
  static generateFollowUpMessage(heatScore, leadName) {
    const messages = {
      HOT: `Hi ${leadName}! Just checking in on your interest. Let me know if you have any questions!`,
      WARM: `${leadName}, this is a time-sensitive opportunity. Can we finalize this deal? Don't miss out!`,
      COLD: `Hi ${leadName}, we haven't heard from you in a while. Let's reconnect and see how we can help you.`,
    };
    return messages[heatScore] || messages.COLD;
  }

  /**
   * Scan all leads and log revenue leaks
   */
  static async scanAndLogLeaks() {
    const leads = await Lead.find({ status: { $ne: 'closed' } });
    let leaksDetected = 0;
    let estimatedLosses = 0;

    for (const lead of leads) {
      const { isLeak, reason, estimatedLoss } = await this.detectLeak(lead._id);

      if (isLeak) {
        // Check if leak is already logged (avoid duplicates)
        const existingLeak = await RevenueLeakLog.findOne({
          leadId: lead._id,
          reason,
          detectedAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }, // Last 24 hours
        });

        if (!existingLeak) {
          await RevenueLeakLog.create({
            leadId: lead._id,
            reason,
            estimatedLoss,
          });
          leaksDetected++;
          estimatedLosses += estimatedLoss;
        }
      }
    }

    return {
      leaksDetected,
      totalEstimatedLoss: estimatedLosses,
      timestamp: new Date(),
    };
  }

  /**
   * Get all active revenue leaks
   */
  static async getAllLeaks(filters = {}) {
    const query = { ...filters };
    const leaks = await RevenueLeakLog.find(query)
      .populate('leadId', 'name contact status estimatedDealValue')
      .sort({ detectedAt: -1 });

    return leaks;
  }

  /**
   * Get estimated total revenue loss
   */
  static async getTotalRevenueLoss() {
    const result = await RevenueLeakLog.aggregate([
      {
        $group: {
          _id: null,
          totalLoss: { $sum: '$estimatedLoss' },
          count: { $sum: 1 },
        },
      },
    ]);

    return result[0] || { totalLoss: 0, count: 0 };
  }

  /**
   * Get lead distribution by heat score
   */
  static async getLeadDistributionByHeat() {
    const leads = await Lead.find({ status: { $ne: 'closed' } });

    const distribution = {
      HOT: 0,
      WARM: 0,
      COLD: 0,
    };

    leads.forEach((lead) => {
      const heat = this.getHeatScore(lead);
      distribution[heat]++;
    });

    return distribution;
  }
}

export default RevenueLeakService;
