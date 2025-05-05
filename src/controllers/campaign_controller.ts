import { Response, Request } from 'express';
import { AuthRequest } from '../middleware/auth_middleware';
import { createCampaign, getCampaignsByBusinessId , deleteCampaignById , listAllCampaigns  } from '../services/campaign_service';
import { getBusinessesByUserId } from '../services/business_service';
import { supabase } from '../config/db';


export const create = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== 'business')
      return void res.status(403).json({ error: 'Sadece işletme hesabı kampanya oluşturabilir.' });

    const { business_id, title, description, start_date, end_date, discount } = req.body;

    // 🚦 Kullanıcının gerçekten bu işletmeye sahip olduğundan emin ol
    const owns = (await getBusinessesByUserId(req.user.id)).some(b => b.id === Number(business_id));
    if (!owns) return void res.status(403).json({ error: 'Bu işletme sana ait değil.' });

    const newCampaign = await createCampaign({
      business_id: Number(business_id),
      title,
      description,
      start_date,
      end_date,
      discount
    });

    res.status(201).json(newCampaign);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const listByBusiness = async (req: Request, res: Response) => {
  try {
    const businessId = Number(req.params.businessId);
    const campaigns = await getCampaignsByBusinessId(businessId);
    res.json(campaigns);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const remove = async (req: AuthRequest, res: Response) => {
    try {
      const campaignId = Number(req.params.id);
      if (req.user?.role !== 'business') {
        res.status(403).json({ error: 'Sadece işletme yetkilileri silebilir.' });
        return;
      }
  
      const { data: campaign, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('id', campaignId)
        .single();
  
      if (error || !campaign) {
        res.status(404).json({ error: 'Kampanya bulunamadı.' });
        return;
      }
  
      const ownsBusiness = (await getBusinessesByUserId(req.user.id)).some(
        b => b.id === campaign.business_id
      );
  
      if (!ownsBusiness) {
        res.status(403).json({ error: 'Bu kampanya senin işletmene ait değil.' });
        return;
      }
  
      await deleteCampaignById(campaignId);
      res.status(200).json({ message: 'Kampanya silindi.' });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };
  
  export const listAll = async (_req: Request, res: Response) => {
    try {
      const campaigns = await listAllCampaigns();
      res.json(campaigns);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };