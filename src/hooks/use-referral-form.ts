import { useState, useRef, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { submitReferral, uploadCv } from '@/services/referrals-service';

export function useReferralForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const preselectedJob = searchParams.get('job');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [referralMethod, setReferralMethod] = useState('upload');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: preselectedJob || '',
    link: '',
    notes: '',
  });

  const formRef = useRef<HTMLFormElement>(null);
  const [isPositionOpen, setIsPositionOpen] = useState(false);

  const simulateAIParsing = (filename: string) => {
    setIsParsing(true);
    setTimeout(() => {
      setIsParsing(false);
      const nameMatch = filename.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      setFormData(prev => ({
        ...prev,
        fullName: nameMatch || 'Nguyễn Văn A',
        email: 'ungvien.tiemnang@email.com',
        phone: '0987654321'
      }));
      toast.success('Đã trích xuất thông tin từ CV!', {
        description: 'Vui lòng kiểm tra lại các thông tin bên dưới.'
      });
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      simulateAIParsing(selectedFile.name);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (referralMethod === 'upload' && !file) {
      toast.error('Vui lòng tải lên CV của ứng viên');
      return;
    }
    if (referralMethod === 'link' && !formData.link) {
      toast.error('Vui lòng nhập link hồ sơ/portfolio');
      return;
    }
    if (!formData.position) {
      toast.error('Vui lòng chọn vị trí!');
      return;
    }
    setIsConfirmOpen(true);
  };

  const submitMutation = useMutation({
    mutationFn: async () => {
      let cvUrl = formData.link;
      if (referralMethod === 'upload' && file) {
        cvUrl = await uploadCv(file);
      }
      return submitReferral({
        candidateName: formData.fullName,
        candidateEmail: formData.email,
        candidatePhone: formData.phone,
        candidateLinkedin: formData.link,
        cvUrl: cvUrl,
        jobId: 'JOB-' + Math.floor(Math.random() * 1000), // In reality, resolve position to Job ID
        notes: formData.notes,
      });
    },
    onSuccess: () => {
      setIsConfirmOpen(false);
      toast.success('Giới thiệu thành công!', {
        description: 'Hồ sơ của ứng viên đã được gửi đến iHiring để xem xét.',
      });
      setFile(null);
      setFormData({
        fullName: '', email: '', phone: '', position: '', link: '', notes: ''
      });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      queryClient.invalidateQueries({ queryKey: ['referrals'] });
      navigate('/my-referrals');
    },
    onError: () => {
      toast.error('Có lỗi xảy ra khi gửi. Vui lòng thử lại.');
      setIsConfirmOpen(false);
    }
  });

  return {
    formRef,
    formData,
    handleInputChange,
    handleSubmit,
    handleFileChange,
    file,
    setFile,
    isParsing,
    referralMethod,
    setReferralMethod,
    isPositionOpen,
    setIsPositionOpen,
    isConfirmOpen,
    setIsConfirmOpen,
    isSubmitting: submitMutation.isPending,
    handleConfirmSubmit: () => submitMutation.mutate(),
    navigate,
  };
}
