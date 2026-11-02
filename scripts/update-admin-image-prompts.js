const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'app', 'admin', 'AdminDashboardClient.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const targetStr = `{aiGeneratedArticle.imagePrompt && (
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/90 via-slate-50 to-white border border-indigo-200 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                          <ImageIcon size={14} />
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-slate-900">
                            Rekomendasi Prompt Gambar AI (Text-to-Image)
                          </h5>
                          <p className="text-[10px] text-slate-500">
                            Salin prompt ini ke Midjourney, DALL-E 3, atau Flux untuk membuat featured image cover
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopyImagePrompt(aiGeneratedArticle.imagePrompt)}
                        className="px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-50 text-indigo-700 border border-indigo-200 text-xs font-bold inline-flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                      >
                        {copiedPrompt ? (
                          <>
                            <Check size={12} className="text-emerald-600" />
                            <span className="text-emerald-700">Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            <span>Salin Prompt</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Monospace prompt container */}
                    <div className="p-3 bg-slate-900 rounded-xl text-slate-100 font-mono text-[11px] leading-relaxed select-all shadow-inner">
                      {aiGeneratedArticle.imagePrompt}
                    </div>

                    {aiGeneratedArticle.imageConcept && (
                      <p className="text-[11px] text-slate-600 leading-snug">
                        <strong className="text-slate-800 font-bold">Konsep Visual Foto:</strong> {aiGeneratedArticle.imageConcept}
                      </p>
                    )}
                  </div>
                )}`;

const replacementStr = `{(() => {
                  const promptList: Array<{
                    id: string;
                    label: string;
                    placement: string;
                    prompt: string;
                    concept: string;
                  }> =
                    aiGeneratedArticle.imagePrompts && aiGeneratedArticle.imagePrompts.length > 0
                      ? aiGeneratedArticle.imagePrompts
                      : [
                          {
                            id: 'cover',
                            label: 'Gambar 1: Cover Utama (16:9)',
                            placement: 'Header Artikel / Thumbnail Berita',
                            prompt: aiGeneratedArticle.imagePrompt || '',
                            concept: aiGeneratedArticle.imageConcept || '',
                          },
                        ];

                  const currentPrompt = promptList[activeImagePromptTab] || promptList[0];

                  return (
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/90 via-slate-50 to-white border border-indigo-200 shadow-xs space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-100 pb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs shrink-0">
                            <ImageIcon size={15} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="text-xs font-bold text-slate-900">
                                Rekomendasi Prompt Multi-Gambar AI ({promptList.length} Gambar Teknis)
                              </h5>
                              <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-mono font-bold">
                                Photorealistic 8K
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-500 mt-0.5">
                              Prompt teknis untuk Midjourney, DALL-E 3, atau Flux dengan parameter pencahayaan industri akurat.
                            </p>
                          </div>
                        </div>

                        {/* Tab Selector for Images */}
                        <div className="flex items-center gap-1 bg-white/80 p-1 rounded-full border border-indigo-200 shrink-0 self-start sm:self-auto">
                          {promptList.map((item, idx) => (
                            <button
                              key={item.id || idx}
                              type="button"
                              onClick={() => setActiveImagePromptTab(idx)}
                              className={\`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer \${
                                activeImagePromptTab === idx
                                  ? 'bg-indigo-600 text-white shadow-xs'
                                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                              }\`}
                            >
                              Gambar {idx + 1}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Active Prompt Details */}
                      {currentPrompt && (
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-extrabold text-xs text-slate-900">
                                {currentPrompt.label}
                              </span>
                              <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-200/80 text-slate-700 font-mono">
                                📍 Penempatan: {currentPrompt.placement}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleCopyImagePrompt(currentPrompt.prompt, currentPrompt.id)}
                              className="px-3 py-1 rounded-full bg-white hover:bg-slate-50 text-indigo-700 border border-indigo-200 text-xs font-bold inline-flex items-center gap-1.5 shadow-xs transition-all cursor-pointer shrink-0"
                            >
                              {copiedPromptId === currentPrompt.id || (copiedPrompt && promptList.length === 1) ? (
                                <>
                                  <Check size={12} className="text-emerald-600" />
                                  <span className="text-emerald-700">Tersalin!</span>
                                </>
                              ) : (
                                <>
                                  <Copy size={12} />
                                  <span>Salin Prompt {activeImagePromptTab + 1}</span>
                                </>
                              )}
                            </button>
                          </div>

                          {/* Monospace prompt container */}
                          <div className="p-3 bg-slate-900 rounded-xl text-slate-100 font-mono text-[11px] leading-relaxed select-all shadow-inner border border-slate-800">
                            {currentPrompt.prompt}
                          </div>

                          {currentPrompt.concept && (
                            <div className="p-2.5 rounded-xl bg-white border border-indigo-100 text-[11px] text-slate-600 leading-snug">
                              <strong className="text-indigo-900 font-bold">Deskripsi Visual:</strong> {currentPrompt.concept}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })()}`;

const normTarget = targetStr.replace(/\r\n/g, '\n');
const normContent = content.replace(/\r\n/g, '\n');

if (normContent.includes(normTarget)) {
  const updated = normContent.replace(normTarget, replacementStr);
  fs.writeFileSync(filePath, updated, 'utf8');
  console.log('SUCCESSFULLY_UPDATED');
} else {
  console.error('TARGET_NOT_FOUND');
  process.exit(1);
}
