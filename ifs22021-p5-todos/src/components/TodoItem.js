import React from "react";
import * as Icon from "react-feather";
import { formatDate } from "../utils/tools";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function TodoItem({ todo, onDelete, onTodoFinished, isDetail }) {
  let buttonAction;
  if (!todo.is_finished) {
    buttonAction = (
      <button
        onClick={() => onTodoFinished(todo.id, 1)}
        className="btn btn-outline-success me-2"
      >
        <Icon.Check />
        <span>Selesai</span>
      </button>
    );
  } else {
    buttonAction = (
      <button
        onClick={() => onTodoFinished(todo.id, 0)}
        className="btn btn-outline-danger me-2"
      >
        <Icon.X />
        <span>Belum Selesai</span>
      </button>
    );
  }

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div>
            <h5>
              {!isDetail ? (
                <Link to={`/detail/${todo.id}`}>{todo.title}</Link>
              ) : (
                todo.title
              )}
            </h5>
            <div>
              {todo.is_finished ? (
                <div>
                  <Icon.Check />
                  <span className="ms-2 text-success">
                    {formatDate(todo.updated_at)}
                  </span>
                </div>
              ) : null}
              <div>
                <Icon.Clock />
                <span className="ms-2 text-muted">
                  {formatDate(todo.created_at)}
                </span>
              </div>
            </div>
          </div>
          <div>
            {buttonAction}
            {/* Tombol Edit */}
            <Link to={`/edit/${todo.id}`} className="btn btn-outline-primary">
              <Icon.Edit />
              <span>Edit</span>
            </Link>
          </div>
        </div>
        <hr />
        <div className="d-flex justify-content-between">
          <div>
            <p>{todo.description}</p>
          </div>
          {!isDetail ? (
            <div className="text-end">
              <button
                onClick={() => {
                  // eslint-disable-next-line no-undef
                  Swal.fire({
                    title: "Hapus Todo",
                    text: `Apakah kamu yakin ingin mehapus todo: ${todo.title}?`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Ya, Tetap Hapus",
                    customClass: {
                      confirmButton: "btn btn-danger me-3 mb-4",
                      cancelButton: "btn btn-secondary mb-4",
                    },
                    buttonsStyling: false,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      // eslint-disable-next-line no-undef
                      onDelete(todo.id);
                    }
                  });
                }}
                className="btn btn-danger"
              >
                <Icon.Trash />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    is_finished: PropTypes.number.isRequired,
    cover: PropTypes.string,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onTodoFinished: PropTypes.func.isRequired,
  isDetail: PropTypes.bool.isRequired,
};

export default TodoItem;
