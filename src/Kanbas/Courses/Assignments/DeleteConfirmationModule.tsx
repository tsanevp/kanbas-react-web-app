export default function DeleteConfirmationModule({ assignmentId, deleteAssignments }:
    Readonly<{
        assignmentId: string;
        deleteAssignments: (assignmentId: string) => void;
    }>) {
    return (
        <div id="wd-add-module-dialog" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">
                            Are sure you want to remove this assignment?
                        </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Cancel 
                        </button>
                        <button onClick={() => deleteAssignments(assignmentId)} type="button" data-bs-dismiss="modal" className="btn btn-danger">
                            Delete Assignment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
