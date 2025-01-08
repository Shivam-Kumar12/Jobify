import styled from 'styled-components';
import Wrapper from './DashboardFormPage';

const Company = styled.section`
  /* CompanyInfoWrapper.js */
.wrapper {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.main-icon {
  background-color: #007bff;
  color: #fff;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  margin-right: 20px;
}

.info h5 {
  margin: 0;
  font-size: 20px;
}

.info p {
  margin: 0;
  color: #666;
}

.content {
  border-top: 1px solid #ccc;
  padding-top: 20px;
}

.content-center {
  display: flex;
  justify-content: space-between;
}

.info-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.info-row svg {
  margin-right: 10px;
}

.footer {
  margin-top: 20px;
}

.footer button {
  margin-right: 10px;
}

.edit-btn {
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn {
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
`
export default Wrapper;