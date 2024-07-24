import React from "react";
import  Container  from "react-bootstrap/Container";
import { Stack, Button } from "react-bootstrap";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import { useState } from "react";
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "./contexts/BudgetsContext";
import AddExpenseModal from "./components/AddExpenseModal";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import ViewExpensesModal from "./components/ViewExpensesModal";
import Calculator from './components/Calculator';

function App() {

  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId,] = useState();
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();


  const { budgets, getBudgetExpenses } = useBudgets();

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  return (
    <>
    <div
    style={{
      backgroundImage: 'url(/image/bg1.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      marginRight: '-20%',
      maxWidth: '100%',
    }}
  >
    <Container className="my-4" style={{backgroundColor: 'rgba( 256, 256, 256, 0.7)', zIndex: '1', display: 'inline-block', marginLeft: '150px'}}>
    <Stack direction="horizontal" gap="2" className="mb-4">
      <h1 className="me-auto">
        Budgets
      </h1>
      <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
      <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expense</Button>
    </Stack>
    <div style={{
                 display: "grid",
                 gridTemplateColumns: "repeat(auto-fill, minmax(500px, 1fr))",
                 gap: "1rem",
                 alignItems: "flex-start",
                  }}
    >
      {budgets.map(budget => {
        const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)
        return(
        <BudgetCard
         name={budget.name}
         amount={amount}
          max={budget.max}
          key={budget.id}
          onAddExpenseClick={() => openAddExpenseModal(budget.id)}
          onViewExpensesClick={() => setViewExpensesModalBudgetId(budget.id)}
        />
        )
        })}
        <UncategorizedBudgetCard 
        onAddExpenseClick={openAddExpenseModal}
        onViewExpensesClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
        />
    </div>
    <TotalBudgetCard />
  </Container>
  </div>
  <AddBudgetModal 
   show={showAddBudgetModal}
   handleClose={() => setShowAddBudgetModal(false)}
  />
  <AddExpenseModal
  show={showAddExpenseModal}
  defaultBudgetId={addExpenseModalBudgetId}
  handleClose={() => setShowAddExpenseModal(false)}
  />
  <ViewExpensesModal
  budgetId={viewExpensesModalBudgetId}
  handleClose={() => setViewExpensesModalBudgetId()}
  />
  <h3>Calculator</h3>
  <Calculator />
  </>
  );
}

export default App;
