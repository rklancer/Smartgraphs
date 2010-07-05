class DialogTurnsController < ApplicationController
  # GET /dialog_turns
  # GET /dialog_turns.xml
  def index
    @dialog_turns = DialogTurn.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @dialog_turns }
      dialog_turns = @dialog_turns.map {|dialog_turn| sproutcore_json(dialog_turn) }
      format.json { render :json => { :content => dialog_turns } }
    end
  end

  # GET /dialog_turns/1
  # GET /dialog_turns/1.xml
  def show
    @dialog_turn = DialogTurn.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @dialog_turn }
      dialog_turn = sproutcore_json(@dialog_turn)
      format.json { render :json => { :content => dialog_turn } }
    end
  end

  # GET /dialog_turns/new
  # GET /dialog_turns/new.xml
  def new
    @dialog_turn = DialogTurn.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @dialog_turn }
    end
  end

  # GET /dialog_turns/1/edit
  def edit
    @dialog_turn = DialogTurn.find(params[:id])
  end

  # POST /dialog_turns
  # POST /dialog_turns.xml
  def create
    @dialog_turn = DialogTurn.new(params[:dialog_turn])

    respond_to do |format|
      if @dialog_turn.save
        format.html { redirect_to(@dialog_turn, :notice => 'DialogTurn was successfully created.') }
        format.xml  { render :xml => @dialog_turn, :status => :created, :location => @dialog_turn }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @dialog_turn.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /dialog_turns/1
  # PUT /dialog_turns/1.xml
  def update
    @dialog_turn = DialogTurn.find(params[:id])

    respond_to do |format|
      if @dialog_turn.update_attributes(params[:dialog_turn])
        format.html { redirect_to(@dialog_turn, :notice => 'DialogTurn was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @dialog_turn.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /dialog_turns/1
  # DELETE /dialog_turns/1.xml
  def destroy
    @dialog_turn = DialogTurn.find(params[:id])
    @dialog_turn.destroy

    respond_to do |format|
      format.html { redirect_to(dialog_turns_url) }
      format.xml  { head :ok }
    end
  end
end
