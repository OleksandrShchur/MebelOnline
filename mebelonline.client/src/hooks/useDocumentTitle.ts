import { useEffect } from 'react';
import { SHOP_NAME } from '../constants/contacts';

export const DEFAULT_DOCUMENT_TITLE = `${SHOP_NAME} — меблі онлайн`;

const useDocumentTitle = (title?: string) => {
  useEffect(() => {
    const previous = document.title;
    document.title = title ? `${title} | ${SHOP_NAME}` : DEFAULT_DOCUMENT_TITLE;
    return () => {
      document.title = previous;
    };
  }, [title]);
};

export default useDocumentTitle;
