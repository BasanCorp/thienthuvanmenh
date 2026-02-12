import { motion } from 'framer-motion';
import { User, Clock } from 'lucide-react';

export default function PhysiognomyPage() {
  return (
    <div className="min-h-screen bg-mystical pt-24 pb-16 px-4">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-water)]/20 border border-[var(--color-water)]/30 mb-6">
            <User size={32} className="text-[var(--color-water)]" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-[var(--color-ivory)] mb-4">Tướng Số Khuôn Mặt</h1>
          <p className="text-[var(--color-mist)] max-w-xl mx-auto">Phân tích ngũ quan theo Mian Xiang - Thuật nhân tướng học Trung Hoa</p>
        </div>

        {/* Coming Soon Card */}
        <motion.div
          className="card-mystical rounded-2xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--color-water)]/10 border border-[var(--color-water)]/30 flex items-center justify-center">
            <Clock size={40} className="text-[var(--color-water)]" />
          </div>

          <h2 className="font-display text-2xl md:text-3xl text-gradient-gold mb-4">
            Tính Năng Đang Phát Triển
          </h2>

          <p className="text-[var(--color-pearl)] max-w-lg mx-auto mb-6 leading-relaxed">
            Chúng tôi đang hoàn thiện tính năng xem tướng mặt với cơ sở dữ liệu kiến giải chi tiết
            theo truyền thống Mian Xiang (面相). Tính năng sẽ sớm được cập nhật.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="p-4 rounded-xl bg-[var(--color-smoke)]/50">
              <h4 className="text-[var(--color-water)] font-display mb-2">Tam Đình</h4>
              <p className="text-sm text-[var(--color-mist)]">Ba vùng: Trán, Mũi, Cằm</p>
            </div>
            <div className="p-4 rounded-xl bg-[var(--color-smoke)]/50">
              <h4 className="text-[var(--color-water)] font-display mb-2">Ngũ Quan</h4>
              <p className="text-sm text-[var(--color-mist)]">Mắt, Mũi, Miệng, Tai, Lông mày</p>
            </div>
            <div className="p-4 rounded-xl bg-[var(--color-smoke)]/50">
              <h4 className="text-[var(--color-water)] font-display mb-2">Ngũ Nhạc</h4>
              <p className="text-sm text-[var(--color-mist)]">Năm gò trên khuôn mặt</p>
            </div>
          </div>

          <p className="text-xs text-[var(--color-mist)] mt-8">
            Trong khi chờ đợi, bạn có thể khám phá các tính năng khác như Thần Số Học hoặc Tử Vi
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
