function ArticleCard({ article, onClick }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const truncateContent = (text, maxLength = 80) => {
    if (!text) return '';
    const firstLine = text.split('\n')[0];
    return firstLine.length > maxLength 
      ? firstLine.substring(0, maxLength) + '...' 
      : firstLine;
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow hover:shadow-lg transition-all duration-200 cursor-pointer p-4 border border-gray-200 hover:border-blue-400 flex flex-col h-full"
    >
      {/* En-tête avec titre et icônes */}
      <div className="flex justify-between items-start mb-2 gap-3">
        <h3 className="text-base font-semibold text-gray-900 line-clamp-2 flex-1 group-hover:text-blue-600">
          {article.title}
        </h3>
        
        {/* Badges fichiers */}
        <div className="flex gap-1 flex-shrink-0">
          {article.file && (
            <div className="w-6 h-6 flex items-center justify-center bg-blue-100 rounded" title="PDF joint">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          {article.image && (
            <div className="w-6 h-6 flex items-center justify-center bg-green-100 rounded" title="Image jointe">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Aperçu du contenu */}
      <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-1">
        {truncateContent(article.content, 80)}
      </p>

      {/* Date en bas */}
      <div className="flex items-center gap-1 text-xs text-gray-500 pt-2 border-t border-gray-100">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>{formatDate(article.edited_at)}</span>
      </div>
    </div>
  );
}

export default ArticleCard;