class GuidePageSequencesController < ApplicationController
  # GET /guide_page_sequences
  # GET /guide_page_sequences.xml
  def index
    @guide_page_sequences = GuidePageSequence.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @guide_page_sequences }
      guide_page_sequences = @guide_page_sequences.map {|guide_page_sequence| sproutcore_json(guide_page_sequence) }
      format.json { render :json => { :content => guide_page_sequences } }
    end
  end

  # GET /guide_page_sequences/1
  # GET /guide_page_sequences/1.xml
  def show
    @guide_page_sequence = GuidePageSequence.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @guide_page_sequence }
      format.json do
        render :json => {
          :content => sproutcore_json(@guide_page_sequence),
          :location => guide_page_sequence_path(@guide_page_sequence)
        }
      end
    end
  end

  # GET /guide_page_sequences/new
  # GET /guide_page_sequences/new.xml
  def new
    @guide_page_sequence = GuidePageSequence.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @guide_page_sequence }
    end
  end

  # GET /guide_page_sequences/1/edit
  def edit
    @guide_page_sequence = GuidePageSequence.find(params[:id])
  end

  # POST /guide_page_sequences
  # POST /guide_page_sequences.xml
  def create
    @guide_page_sequence = GuidePageSequence.new(params[:guide_page_sequence])

    respond_to do |format|
      if @guide_page_sequence.save
        format.html { redirect_to(@guide_page_sequence, :notice => 'GuidePageSequence was successfully created.') }
        format.xml  { render :xml => @guide_page_sequence, :status => :created, :location => @guide_page_sequence }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @guide_page_sequence.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /guide_page_sequences/1
  # PUT /guide_page_sequences/1.xml
  def update
    @guide_page_sequence = GuidePageSequence.find(params[:id])

    respond_to do |format|
      if @guide_page_sequence.update_attributes(params[:guide_page_sequence])
        format.html { redirect_to(@guide_page_sequence, :notice => 'GuidePageSequence was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @guide_page_sequence.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /guide_page_sequences/1
  # DELETE /guide_page_sequences/1.xml
  def destroy
    @guide_page_sequence = GuidePageSequence.find(params[:id])
    @guide_page_sequence.destroy

    respond_to do |format|
      format.html { redirect_to(guide_page_sequences_url) }
      format.xml  { head :ok }
    end
  end
end
