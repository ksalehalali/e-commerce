import { createGlobalStyle } from "styled-components";

import { COLORS } from "./variables";

// font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
//     Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;

const GlobalStyles = createGlobalStyle`


html,
body {
  padding: 0;
  margin: 0;
  background-color: #f7fbff;
  caret-color: ${COLORS.PRIMARY};
  ${(props) =>
      props.pathname?.includes("/categories") && `background-color: #ebf7f7;`}
    ${(props) => props.locale === "ar" && `direction: rtl;`}
    font-family: ${(props) =>
        props.locale === "ar"
            ? "'Tajawal', sans-serif;"
            : "'M PLUS 1p', sans-serif;"}
}

path.liked {
  color: red !important;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

.sidebar-item {
  ${(props) => {
      if (props.locale === "ar")
          return `border-right: 1px  solid ${COLORS.PRIMARY};`;
      if (props.locale === "en")
          return `border-left: 1px  solid ${COLORS.PRIMARY};`;
  }}
}

h1,h2,h3,h4,h5,h6 {
    margin: 0;
}

.add-btn span {
  line-height: 31px;
}

a.active {
  color: #2f2f2f;
  font-weight: 600;
  background-color: #dddddd1c;
  text-decoration: underline !important;
}

.ant-spin-spinning {
  position: absolute;
  display: inline-block;
  opacity: 1;
  z-index: 444;
  top: 10px;
  ${(props) => {
      if (props.locale == "ar") {
          return `left: 14px`;
      } else {
          return `right: 14px`;
      }
  }}
}

.ant-input-affix-wrapper {
  ${(props) => {
      if (props.locale === "ar") return `flex-direction: row-reverse;`;
  }}
}

input.ant-input {
  color: ${COLORS.TEXT_PRIMARY};
  padding-top: 2px;
  font-size: 15px;
}


.ant-form-vertical .ant-form-item-label, .ant-col-24.ant-form-item-label, .ant-col-xl-24.ant-form-item-label {
  padding-bottom: 4px;
}
.ant-form-item-label > label {
  color: ${COLORS.PRIMARY};
}

.ant-tree {
  background-color: transparent;
}

.loader {
  position: fixed;
  inset: 0;
  z-index: 200000;
  display: flex;
  justify-content: center;
  align-items: center;
}

#nprogress .bar {
  height: 5px;
}


.ant-pagination {
  display: flex;
  padding: 10px 0;
  gap: 10px;
  
}
.ant-pagination > li {
  margin: 0;
}
.ant-table-content, .ant-table-content thead th {
  text-align: left;
}

${(props) => {
    if (props.locale === "ar")
        return `
    form .ant-form-item-label {
      text-align: right !important;
    }
    .ant-pagination {
      flex-direction: row-reverse;
      justify-content: flex-end;
    }
   
    .ant-table-content,.ant-table table, .ant-table-content thead th {
      text-align: right ;
    }

    .ant-modal-close {
      right: unset;
      left: 0px;
    }
  `;
}}

.ant-modal-footer {
  display: flex;
  gap: 10px;  
  > button {
    margin: 0;
  }
}

`;

export default GlobalStyles;
