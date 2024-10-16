import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <SearchForm>
      {/* <Label htmlFor="searchInput" className="visually-hidden">
        어디로 여행을 떠날 예정인가요?
      </Label> */}
      <InputWrapper>
        <SearchInput
          type="text"
          id="searchInput"
          placeholder="어디로 여행을 떠날 예정인가요?"
        />
        <StyledFaSearch />
      </InputWrapper>
    </SearchForm>
  );
};

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  min-width: 240px;
  font-size: 16px;
  color: #767676;
  font-weight: 300;
  margin: auto 0;
`;

// const Label = styled.label`
//   position: absolute;
//   width: 1px;
//   height: 1px;
//   padding: 0;
//   margin: -1px;
//   overflow: hidden;
//   clip: rect(0, 0, 0, 0);
//   white-space: nowrap;
//   border: 0;
// `;

const InputWrapper = styled.div`
  position: relative; /* 아이콘을 입력창에 절대 위치시키기 위해 relative 설정 */
  flex-grow: 1;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 0px 10px 0px; /* 오른쪽 패딩을 아이콘 크기에 맞춰 조정 */
  border: none; /* 전체 테두리 제거 */
  border-bottom: 1px solid #ccc; /* 밑줄 추가 */
  border-radius: 0; /* 테두리 반경을 0으로 설정 */
  font-size: 16px;
  
  @media (max-width: 991px) {
    padding-right: 20px;
  }
`;

const StyledFaSearch = styled(FaSearch)`
  position: absolute; /* 아이콘을 입력창 내에 절대 위치 */
  right: 10px; /* 오른쪽 여백 */
  top: 50%; /* 세로 중앙 정렬 */
  transform: translateY(-50%); /* 세로 중앙 정렬을 위한 변환 */
  width: 20px; /* 아이콘 너비 */
  height: 20px; /* 아이콘 높이 */
  color: #767676; /* 아이콘 색상 */
  pointer-events: none; /* 클릭 이벤트 비활성화 (입력창에 포커스 주기 위해) */
`;

export default SearchBar;
