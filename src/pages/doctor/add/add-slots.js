import React from 'react'

function addSlots() {
  return (
    <div>
        {/* <!-- Add Time Slot Modal --> */}
    <div className=" " >
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Add Time Slots</h5>
						<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">
						<form>
							<div className="hours-info">
								<div className="row form-row hours-cont">
									<div className="col-12 col-md-10">
										<div className="row form-row">
											<div className="col-12 col-md-6">
												<div className="form-group">
													<label>Start Time</label>
													<select className="form-control">
														<option>-</option>
														<option>12.00 am</option>
														<option>12.30 am</option>  
														<option>1.00 am</option>
														<option>1.30 am</option>
													</select>
												</div> 
											</div>
											<div className="col-12 col-md-6">
												<div className="form-group">
													<label>End Time</label>
													<select className="form-control">
														<option>-</option>
														<option>12.00 am</option>
														<option>12.30 am</option>  
														<option>1.00 am</option>
														<option>1.30 am</option>
													</select>
												</div> 
											</div>
										</div>
									</div>
								</div>
							</div>
							
							<div className="add-more mb-3">
								<a href="javascript:void(0);" className="add-hours"><i className="fa fa-plus-circle"></i> Add More</a>
							</div>
							<div className="submit-section text-center">
								<button type="submit" className="btn btn-primary submit-btn">Save Changes</button>
							</div>
						</form>
					</div>
				</div>
			</div>
    </div>
		{/* /* <!-- /Add Time Slot Modal --> */ }
    </div>
  )
}

export default addSlots