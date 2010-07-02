class StaticAnnotationsController < ApplicationController
  # GET /static_annotations
  # GET /static_annotations.xml
  def index
    @static_annotations = StaticAnnotations.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @static_annotations }
    end
  end

  # GET /static_annotations/1
  # GET /static_annotations/1.xml
  def show
    @static_annotations = StaticAnnotations.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @static_annotations }
    end
  end

  # GET /static_annotations/new
  # GET /static_annotations/new.xml
  def new
    @static_annotations = StaticAnnotations.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @static_annotations }
    end
  end

  # GET /static_annotations/1/edit
  def edit
    @static_annotations = StaticAnnotations.find(params[:id])
  end

  # POST /static_annotations
  # POST /static_annotations.xml
  def create
    @static_annotations = StaticAnnotations.new(params[:static_annotations])

    respond_to do |format|
      if @static_annotations.save
        format.html { redirect_to(@static_annotations, :notice => 'StaticAnnotations was successfully created.') }
        format.xml  { render :xml => @static_annotations, :status => :created, :location => @static_annotations }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @static_annotations.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /static_annotations/1
  # PUT /static_annotations/1.xml
  def update
    @static_annotations = StaticAnnotations.find(params[:id])

    respond_to do |format|
      if @static_annotations.update_attributes(params[:static_annotations])
        format.html { redirect_to(@static_annotations, :notice => 'StaticAnnotations was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @static_annotations.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /static_annotations/1
  # DELETE /static_annotations/1.xml
  def destroy
    @static_annotations = StaticAnnotations.find(params[:id])
    @static_annotations.destroy

    respond_to do |format|
      format.html { redirect_to(static_annotations_url) }
      format.xml  { head :ok }
    end
  end
end
