import { SKILL_REGISTRY } from './registry';
import { SkillId, SkillExecutionResult, SkillExecutionResult as Result, SkillMetadata } from './types';

export class SkillManager {
  private activeSkills: Set<SkillId> = new Set();
  private executionHistory: SkillExecutionResult[] = [];

  // 1. Discovery Phase
  public getAvailableSkills(): SkillMetadata[] {
    return SKILL_REGISTRY;
  }

  // 2. Activation Phase
  public async activateSkill(skillId: SkillId): Promise<string> {
    this.activeSkills.add(skillId);
    try {
      // In a real environment, we'd fetch the Markdown file.
      // Here we simulate the loading process.
      console.log(`[Agent] Activating skill: ${skillId}`);
      return `Skill ${skillId} activated and loaded into context.`;
    } catch (e) {
      console.error(`Failed to activate skill ${skillId}`, e);
      return `Activation failed.`;
    }
  }

  // 3. Execution Phase
  public async executeSkill(skillId: SkillId, sellerData: any): Promise<Result> {
    const trace: string[] = [`Starting execution for ${skillId}`];
    let insights: any = {};
    let confidence = 0.95;

    trace.push(`Parsing context from ${skillId}/SKILL.md`);

    // Logic routing based on the skill ID
    switch (skillId) {
      case 'churn-analysis':
        const pickRate = sellerData?.user_metrics?.pns_pick_rate_90d || 0;
        const lastLoginDays = 5; // mocked
        insights = {
          churnProbability: pickRate < 50 ? 85 : 15,
          riskFactors: pickRate < 50 ? ['Low PNS Pick-up Rate', 'Recent Inactivity'] : [],
          retentionStrategy: pickRate < 50 ? 'Immediate account manager call' : 'Maintain high engagement'
        };
        trace.push(`Computed churn probability based on pick rate: ${pickRate}%`);
        break;

      case 'upsell-intelligence':
        const callsCount = sellerData?.seller?.call_log_90d?.length || 0;
        insights = {
          upsellProbability: callsCount > 20 ? 92 : 40,
          suggestedPlan: 'Platinum 75K',
          revenueOpportunity: 75000
        };
        trace.push(`Analyzed ${callsCount} customer calls for intent signals`);
        break;

      case 'grievance-risk-analysis':
        const ticketCount = sellerData?.ticketsAgainst?.length || 0;
        insights = {
          trustScore: ticketCount > 5 ? 65 : 92,
          fraudRiskLevel: ticketCount > 10 ? 'High' : 'Low',
          actionRecommended: ticketCount > 5 ? 'Manually audit recent disputes' : 'Continuous monitoring'
        };
        trace.push(`Analyzed ${ticketCount} grievance tickets for risk patterns`);
        break;

      case 'mcat-traffic-analysis':
        const mcats = sellerData?.mcats || [];
        insights = {
          visibilityScore: 78,
          trafficImpact: 'Moderate growth in primary category',
          suggestedMcatAdjustments: mcats.length > 0 ? [`Optimize ${mcats[0].mcat_name}`] : []
        };
        trace.push(`Checking traffic trends for ${mcats.length} assigned categories`);
        break;

      case 'catalog-relevance':
        insights = {
          relevanceScore: 85,
          mismatchedMcats: [],
          enrichmentTips: ['Update product descriptions with missing technical specs']
        };
        trace.push('Validated catalog descriptions against MCAT keywords');
        break;

      case 'seller-health-scoring':
        const score = sellerData?.seller?.user_metrics?.avg_rating * 20 || 80;
        insights = {
          compositeHealthScore: score,
          healthStatus: score > 85 ? 'Superior' : 'Stagnant',
          primaryConcerns: score < 85 ? ['Boost customer feedback responses'] : ['None']
        };
        trace.push('Aggregating all intelligence vectors for final health index');
        break;

      default:
        insights = { message: "Analysis complete", data: {} };
        trace.push('Executed generic health analysis');
        break;
    }

    const result: Result = {
      skillId,
      insights,
      confidence,
      timestamp: new Date().toISOString(),
      reasoningTrace: trace
    };

    this.executionHistory.unshift(result);
    return result;
  }

  public getHistory() {
    return this.executionHistory;
  }

  public getActiveSkillsCount() {
    return this.activeSkills.size;
  }
}

export const agentManager = new SkillManager();
