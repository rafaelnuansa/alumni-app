import React, { useEffect, useState } from 'react';
import { buttonVariants } from '@/components/ui/button';

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface PaginationProps {
  links: PaginationLink[];
  onPageChange: (pageNumber: number) => void;
}

export default function Pagination({ links, onPageChange }: PaginationProps) {
  function getVariantName(active: boolean) {
    return active ? 'default' : 'outline';
  }

  return (
    links.length > 3 && (
      <div className="mb-4">
        <div className="mt-8 flex flex-wrap gap-1">
          {links.map((link, key) =>
            link.url === null ? (
              <button
                key={key}
                className={buttonVariants({ variant: 'outline' })}
                dangerouslySetInnerHTML={{ __html: link.label }}
                onClick={() => onPageChange(parseInt(link.label))}
              ></button>
            ) : (
              <button
                key={key}
                className={buttonVariants({ variant: getVariantName(link.active) })}
                onClick={() => onPageChange(parseInt(link.label))}
                dangerouslySetInnerHTML={{ __html: link.label }}
              ></button>
            )
          )}
        </div>
      </div>
    )
  );
}
