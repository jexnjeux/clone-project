export const formatCreatedAt = (createdAt: string) => {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const gap = now.getTime() - createdDate.getTime();

  const days = Math.floor(gap / (1000 * 60 * 60 * 24));

  if (days <= 30) {
    return `${days}일 전 게시됨`;
  } else if (days <= 365) {
    const months = Math.floor(days / 30);
    return `${months}달 전 게시됨`;
  } else {
    const years = Math.floor(days / 365);
    return `${years}년 전 게시됨`;
  }
};
