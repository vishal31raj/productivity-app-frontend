export const AllowedFileType = [
  {
    id: 1,
    name: 'image',
    types: ['image/png', 'image/jpg', 'image/jpeg'],
    iconPath: 'image',
  },
  {
    id: 2,
    name: 'word',
    types: [
      'application/msword', // .doc
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    ],
    iconPath: '../../../assets/file-types/word.svg',
  },
  {
    id: 3,
    name: 'excel',
    types: [
      'application/vnd.ms-excel', // .xls
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    ],
    iconPath: '../../../assets/file-types/excel.svg',
  },
  {
    id: 4,
    name: 'pdf',
    types: ['application/pdf'],
    iconPath: '../../../assets/file-types/pdf.svg',
  },
  {
    id: 5,
    name: 'text',
    types: ['text/plain'],
    iconPath: '../../../assets/file-types/doc.svg',
  },
];
