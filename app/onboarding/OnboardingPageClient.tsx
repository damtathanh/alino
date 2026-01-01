'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type OnboardingData = {
  displayName?: string;
  companyName?: string;
  primaryPlatform?: string;
  followerRange?: string;
  industry?: string;
  teamSize?: string;
  niche?: string[];
  experienceLevel?: string;
  mainGoal?: string[];
  workedWithCreatorsBefore?: string;
  primaryGoal?: string[];
  howDidYouHear?: string;
  monthlyBudget?: string;
};

export default function OnboardingPageClient({ role }: { role: 'creator' | 'brand' }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<OnboardingData>({});
  const router = useRouter();
  const totalSteps = 3;

  const handleInputChange = (field: keyof OnboardingData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMultiSelect = (field: keyof OnboardingData, value: string) => {
    const current = (formData[field] as string[]) || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    handleInputChange(field, updated);
  };

  const validateStep = (step: number): boolean => {
    if (step === 1) {
      if (role === 'creator') {
        return !!(formData.displayName && formData.primaryPlatform && formData.followerRange);
      } else {
        return !!(formData.companyName && formData.industry && formData.teamSize);
      }
    }
    if (step === 2) {
      if (role === 'creator') {
        return !!(formData.niche && formData.niche.length > 0 && formData.experienceLevel && formData.mainGoal && formData.mainGoal.length > 0);
      } else {
        return !!(formData.workedWithCreatorsBefore && formData.primaryGoal && formData.primaryGoal.length > 0);
      }
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep < totalSteps && validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    if (currentStep === totalSteps) {
      handleComplete();
    } else {
      handleNext();
    }
  };

  const handleComplete = async () => {
    setLoading(true);

    try {
      const res = await fetch('/api/auth/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ onboardingData: formData }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Có lỗi xảy ra khi hoàn tất onboarding');
      }

      router.push(`/${role}`);
    } catch (err) {
      setLoading(false);
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi hoàn tất onboarding';
      alert(errorMessage);
    }
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF1FF] via-[#F5F7FF] to-white py-20 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-[#6B7280]">
              Bước {currentStep} / {totalSteps}
            </span>
            <span className="text-sm text-[#9CA3AF]">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#6366F1] to-[#EC4899] transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-xl border border-black/5">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight mb-2">
                  Thông tin cơ bản
                </h2>
                <p className="text-[#6B7280]">
                  Hãy cho chúng tôi biết một chút về bạn
                </p>
              </div>

              {role === 'creator' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">
                      Tên hiển thị <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.displayName || ''}
                      onChange={(e) => handleInputChange('displayName', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#E4E7EC] focus:ring-2 focus:ring-[#6366F1] focus:border-transparent outline-none transition-all"
                      placeholder="Nhập tên hiển thị của bạn"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">
                      Nền tảng chính <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.primaryPlatform || ''}
                      onChange={(e) => handleInputChange('primaryPlatform', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#E4E7EC] focus:ring-2 focus:ring-[#6366F1] focus:border-transparent outline-none transition-all"
                    >
                      <option value="">Chọn nền tảng</option>
                      <option value="tiktok">TikTok</option>
                      <option value="instagram">Instagram</option>
                      <option value="youtube">YouTube</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">
                      Số lượng người theo dõi <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.followerRange || ''}
                      onChange={(e) => handleInputChange('followerRange', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#E4E7EC] focus:ring-2 focus:ring-[#6366F1] focus:border-transparent outline-none transition-all"
                    >
                      <option value="">Chọn khoảng</option>
                      <option value="<10k">Dưới 10k</option>
                      <option value="10k-50k">10k - 50k</option>
                      <option value="50k-100k">50k - 100k</option>
                      <option value="100k-500k">100k - 500k</option>
                      <option value="500k+">500k+</option>
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">
                      Tên công ty <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.companyName || ''}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#E4E7EC] focus:ring-2 focus:ring-[#6366F1] focus:border-transparent outline-none transition-all"
                      placeholder="Nhập tên công ty"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">
                      Ngành nghề <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.industry || ''}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#E4E7EC] focus:ring-2 focus:ring-[#6366F1] focus:border-transparent outline-none transition-all"
                      placeholder="Ví dụ: Thời trang, Mỹ phẩm, F&B..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">
                      Quy mô team <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.teamSize || ''}
                      onChange={(e) => handleInputChange('teamSize', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#E4E7EC] focus:ring-2 focus:ring-[#6366F1] focus:border-transparent outline-none transition-all"
                    >
                      <option value="">Chọn quy mô</option>
                      <option value="1-5">1 - 5 người</option>
                      <option value="6-20">6 - 20 người</option>
                      <option value="21-50">21 - 50 người</option>
                      <option value="50+">50+ người</option>
                    </select>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Step 2: Insight & Intent */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight mb-2">
                  Mục tiêu & Kinh nghiệm
                </h2>
                <p className="text-[#6B7280]">
                  Giúp chúng tôi hiểu rõ hơn về bạn
                </p>
              </div>

              {role === 'creator' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-3">
                      Lĩnh vực (có thể chọn nhiều) <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-2">
                      {['Beauty', 'Fashion', 'Lifestyle', 'Education', 'Finance', 'Tech', 'Other'].map((niche) => (
                        <label key={niche} className="flex items-center gap-3 p-3 rounded-xl border border-[#E4E7EC] hover:border-[#6366F1] cursor-pointer transition-colors">
                          <input
                            type="checkbox"
                            checked={(formData.niche || []).includes(niche)}
                            onChange={() => handleMultiSelect('niche', niche)}
                            className="w-4 h-4 rounded border-[#E4E7EC] text-[#6366F1] focus:ring-[#6366F1]"
                          />
                          <span className="text-[#374151]">{niche === 'Beauty' ? 'Làm đẹp' : niche === 'Fashion' ? 'Thời trang' : niche === 'Lifestyle' ? 'Lối sống' : niche === 'Education' ? 'Giáo dục' : niche === 'Finance' ? 'Tài chính' : niche === 'Tech' ? 'Công nghệ' : 'Khác'}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">
                      Mức độ kinh nghiệm <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.experienceLevel || ''}
                      onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#E4E7EC] focus:ring-2 focus:ring-[#6366F1] focus:border-transparent outline-none transition-all"
                    >
                      <option value="">Chọn mức độ</option>
                      <option value="new">Mới bắt đầu (0-1 năm)</option>
                      <option value="intermediate">Trung bình (1-3 năm)</option>
                      <option value="professional">Chuyên nghiệp (3+ năm)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-3">
                      Mục tiêu chính (có thể chọn nhiều) <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: 'receive-bookings', label: 'Nhận booking từ Brand' },
                        { value: 'send-proposals', label: 'Chủ động gửi proposal' },
                        { value: 'manage-deals', label: 'Quản lý hợp tác chuyên nghiệp' },
                      ].map((goal) => (
                        <label key={goal.value} className="flex items-center gap-3 p-3 rounded-xl border border-[#E4E7EC] hover:border-[#6366F1] cursor-pointer transition-colors">
                          <input
                            type="checkbox"
                            checked={(formData.mainGoal || []).includes(goal.value)}
                            onChange={() => handleMultiSelect('mainGoal', goal.value)}
                            className="w-4 h-4 rounded border-[#E4E7EC] text-[#6366F1] focus:ring-[#6366F1]"
                          />
                          <span className="text-[#374151]">{goal.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-3">
                      Bạn đã từng hợp tác với Creator chưa? <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {['yes', 'no'].map((option) => (
                        <label key={option} className="flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-[#E4E7EC] hover:border-[#6366F1] cursor-pointer transition-colors">
                          <input
                            type="radio"
                            name="workedWithCreatorsBefore"
                            value={option}
                            checked={formData.workedWithCreatorsBefore === option}
                            onChange={(e) => handleInputChange('workedWithCreatorsBefore', e.target.value)}
                            className="w-4 h-4 border-[#E4E7EC] text-[#6366F1] focus:ring-[#6366F1]"
                          />
                          <span className="text-[#374151] font-medium">{option === 'yes' ? 'Đã từng' : 'Chưa từng'}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-3">
                      Mục tiêu chính (có thể chọn nhiều) <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: 'quick-booking', label: 'Booking nhanh chóng' },
                        { value: 'long-term', label: 'Hợp tác lâu dài' },
                        { value: 'scale-campaigns', label: 'Scale campaign với nhiều Creator' },
                      ].map((goal) => (
                        <label key={goal.value} className="flex items-center gap-3 p-3 rounded-xl border border-[#E4E7EC] hover:border-[#6366F1] cursor-pointer transition-colors">
                          <input
                            type="checkbox"
                            checked={(formData.primaryGoal || []).includes(goal.value)}
                            onChange={() => handleMultiSelect('primaryGoal', goal.value)}
                            className="w-4 h-4 rounded border-[#E4E7EC] text-[#6366F1] focus:ring-[#6366F1]"
                          />
                          <span className="text-[#374151]">{goal.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Step 3: Optional */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight mb-2">
                  Thông tin bổ sung (tùy chọn)
                </h2>
                <p className="text-[#6B7280]">
                  Giúp chúng tôi cải thiện dịch vụ
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">
                  Bạn biết đến ALINO qua đâu?
                </label>
                <select
                  value={formData.howDidYouHear || ''}
                  onChange={(e) => handleInputChange('howDidYouHear', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#E4E7EC] focus:ring-2 focus:ring-[#6366F1] focus:border-transparent outline-none transition-all"
                >
                  <option value="">Chọn phương thức</option>
                  <option value="social-media">Mạng xã hội</option>
                  <option value="friend">Bạn bè giới thiệu</option>
                  <option value="search">Tìm kiếm Google</option>
                  <option value="ad">Quảng cáo</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">
                  Ngân sách hợp tác hàng tháng
                </label>
                <select
                  value={formData.monthlyBudget || ''}
                  onChange={(e) => handleInputChange('monthlyBudget', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#E4E7EC] focus:ring-2 focus:ring-[#6366F1] focus:border-transparent outline-none transition-all"
                >
                  <option value="">Chọn khoảng</option>
                  <option value="<5m">Dưới 5 triệu</option>
                  <option value="5m-10m">5 - 10 triệu</option>
                  <option value="10m-50m">10 - 50 triệu</option>
                  <option value="50m+">50+ triệu</option>
                </select>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#E4E7EC]">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className="px-6 py-3 rounded-xl font-medium text-[#6B7280] border border-[#E4E7EC] hover:border-[#6366F1] hover:text-[#6366F1] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Quay lại
            </button>

            <div className="flex gap-3">
              {currentStep === totalSteps && (
                <button
                  onClick={handleSkip}
                  disabled={loading}
                  className="px-6 py-3 rounded-xl font-medium text-[#6B7280] hover:text-[#6366F1] transition-colors"
                >
                  Bỏ qua
                </button>
              )}

              {currentStep < totalSteps ? (
                <button
                  onClick={handleNext}
                  disabled={!validateStep(currentStep)}
                  className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#EC4899] hover:scale-105 transition-transform shadow-lg shadow-[#6366F1]/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Tiếp tục
                </button>
              ) : (
                <button
                  onClick={handleComplete}
                  disabled={loading}
                  className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#EC4899] hover:scale-105 transition-transform shadow-lg shadow-[#6366F1]/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Đang xử lý...' : 'Hoàn tất'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
