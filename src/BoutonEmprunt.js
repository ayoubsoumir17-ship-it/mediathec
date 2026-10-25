import styled from 'styled-components'

const BoutonEmprunt = styled.button`
  border: 1px solid ${({ $emprunte }) => ($emprunte ? '#d5c8b8' : '#684a32')};
  border-radius: 6px;
  padding: 8px 13px;
  color: ${({ $emprunte }) => ($emprunte ? '#695e52' : '#fff')};
  background: ${({ $emprunte }) => ($emprunte ? '#fff' : '#684a32')};
  font: inherit;
  font-size: 12px;
  font-weight: 650;
  cursor: pointer;
  transition: background 150ms ease, color 150ms ease;

  &:hover {
    color: #fff;
    background: #8c6445;
  }

  &:focus-visible {
    outline: 3px solid #d8b38e;
    outline-offset: 2px;
  }
`

export default BoutonEmprunt
