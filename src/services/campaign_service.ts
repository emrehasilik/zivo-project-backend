import { supabase } from '../config/db';
import { Campaign } from '../models/campaign_model';


export const createCampaign = async (c: Campaign): Promise<Campaign> => {
  const { data, error } = await supabase
    .from('campaigns')
    .insert([c])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Campaign;
};

export const getCampaignsByBusinessId = async (businessId: number): Promise<Campaign[]> => {
  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('business_id', businessId)
    .order('start_date', { ascending: false });

  if (error) throw new Error(error.message);
  return data as Campaign[];
};


export const deleteCampaignById = async (campaignId: number): Promise<void> => {
    const { error } = await supabase
      .from('campaigns')
      .delete()
      .eq('id', campaignId);
  
    if (error) throw new Error(error.message);
  };
  

  export const listAllCampaigns = async (): Promise<Campaign[]> => {
    const { data, error } = await supabase
      // business adını da birlikte getirelim
      .from('campaigns')
      .select('*, business(name)')
      .order('start_date', { ascending: false });
  
    if (error) throw new Error(error.message);
    return data as Campaign[];
  };