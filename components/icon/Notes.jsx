function NoteIcon({ ...props }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17.75 3C18.612 3 19.4386 3.34241 20.0481 3.9519C20.6576 4.5614 21 5.38805 21 6.25V13H16.25C15.388 13 14.5614 13.3424 13.9519 13.9519C13.3424 14.5614 13 15.388 13 16.25V21H6.25C5.38805 21 4.5614 20.6576 3.9519 20.0481C3.34241 19.4386 3 18.612 3 17.75V6.25C3 5.38805 3.34241 4.5614 3.9519 3.9519C4.5614 3.34241 5.38805 3 6.25 3H17.75ZM20.56 14.5L14.5 20.56V16.25C14.5 15.284 15.284 14.5 16.25 14.5H20.56Z"
      />
    </svg>
  );
}

NoteIcon.defaultProps = {
  className: 'fill-current text-na-gray',
};

export default NoteIcon;
