export type BrandRequestId = string;

export type BrandRequestStatus =
  | 'moi'
  | 'dang_thao_luan'
  | 'da_ky'
  | 'dang_duyet_noi_dung'
  | 'hoan_thanh'
  | 'huy';

export type BrandRequest = {
  id: BrandRequestId;
  creatorId: string;
  brandName: string;
  campaignName: string;
  budget?: number | null;
  status: BrandRequestStatus;
  createdAt?: string;
  updatedAt?: string;
};

