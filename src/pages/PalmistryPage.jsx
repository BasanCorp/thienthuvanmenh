import { motion } from 'framer-motion';
import { Hand, Clock } from 'lucide-react';

export default function PalmistryPage() {
  return (
    <div className="min-h-screen bg-mystical pt-24 pb-16 px-4">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-gold)]/20 border border-[var(--color-gold)]/30 mb-6">
            <Hand size={32} className="text-[var(--color-gold)]" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-[var(--color-ivory)] mb-4">Tướng Số Bàn Tay</h1>
          <p className="text-[var(--color-mist)] max-w-xl mx-auto">Phân tích đường vân tay theo nghệ thuật Chinese Palmistry</p>
        </div>

        {/* Coming Soon Card */}
        <motion.div
          className="card-mystical rounded-2xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/30 flex items-center justify-center">
            <Clock size={40} className="text-[var(--color-gold)]" />
          </div>

          <h2 className="font-display text-2xl md:text-3xl text-gradient-gold mb-4">
            Tính Năng Đang Phát Triển
          </h2>

          <p className="text-[var(--color-pearl)] max-w-lg mx-auto mb-6 leading-relaxed">
            Chúng tôi đang hoàn thiện tính năng xem tướng tay với cơ sở dữ liệu kiến giải chi tiết
            theo truyền thống Chinese Palmistry. Tính năng sẽ sớm được cập nhật.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="p-4 rounded-xl bg-[var(--color-smoke)]/50">
              <h4 className="text-[var(--color-gold)] font-display mb-2">Sinh Đạo</h4>
              <p className="text-sm text-[var(--color-mist)]">Life Line - Sức khỏe & năng lượng sống</p>
            </div>
            <div className="p-4 rounded-xl bg-[var(--color-smoke)]/50">
              <h4 className="text-[var(--color-gold)] font-display mb-2">Trí Đạo</h4>
              <p className="text-sm text-[var(--color-mist)]">Head Line - Trí tuệ & tư duy</p>
            </div>
            <div className="p-4 rounded-xl bg-[var(--color-smoke)]/50">
              <h4 className="text-[var(--color-gold)] font-display mb-2">Tâm Đạo</h4>
              <p className="text-sm text-[var(--color-mist)]">Heart Line - Tình cảm & cảm xúc</p>
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
