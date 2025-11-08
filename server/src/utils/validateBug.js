export const validateBug = (bug) => {
  if (!bug.title || !bug.description) {
    throw new Error("Title and description are required");
  }
  const validStatuses = ["Open", "In-Progress", "Resolved", "Closed"];
  const validPriorities = ["Low", "Medium", "High"];
  if (!validStatuses.includes(bug.status) || !validPriorities.includes(bug.priority)) {
    throw new Error("Invalid status or priority");
  }
};
